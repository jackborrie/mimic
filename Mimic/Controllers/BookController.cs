using Microsoft.AspNetCore.Mvc;
using Mimic.Models;
using VersOne.Epub;
using System.Drawing;
using System.Drawing.Imaging;
using System.Net;
using System.Net.Http.Headers;
using Microsoft.EntityFrameworkCore;
using Mimic.Lib;

namespace Mimic.Controllers
{
    [ApiController]
    [Route("api/books")]
    public class BookController : ControllerBase
    {
        private readonly MimicContext _context;

        public BookController(MimicContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public ActionResult GetAll()
        {
            var books = _context.Books.ToList();
            
            var filteredBooks = new FilteredData<Book>();
            filteredBooks.Data = books;
            filteredBooks.TotalPages = 1;
            
            return Ok(filteredBooks);
        }

        [HttpGet("{id}")]
        public ActionResult Get(string? id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest();
            }

            var book = _context.Books.FirstOrDefault(book => book.Id == id);

            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        [HttpGet("{id}/cover")]
        public IActionResult  GetCover(string? id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest();
            }
            
            var book = _context.Books.FirstOrDefault(book => book.Id == id);

            if (book == null || string.IsNullOrEmpty(book.Path))
            {
                return NotFound();
            }

            var bookPath = Path.Combine(Directory.GetCurrentDirectory(), book.Path);
            var coverPath = Path.Combine(bookPath, "cover.jpg");

            Byte[] b = System.IO.File.ReadAllBytes(coverPath);   // You can use your own method over here.         
            return File(b, "image/jpeg");
        }

        [HttpPost("upload")]
        public IActionResult UploadFile(IFormFile file)
        {
            var uploadResult = UploadHandler.UploadTemp(file);
            if (uploadResult != "success")
            {
                return BadRequest(uploadResult);
            }
            
            var path = Path.Combine(Directory.GetCurrentDirectory(), "Uploads\\temp");
            var tempBookPath = Path.Combine(path, file.FileName);
            
            var book = EpubReader.ReadBook(tempBookPath);

            if (book == null)
            {
                return BadRequest();
            }
            
            var newBook = new Book
            {
                Title = book.Title,
                Authors = book.AuthorList,
                HasCover = book.CoverImage != null
            };

            var newFilePath = newBook.Authors[0];

            if (string.IsNullOrEmpty(newFilePath))
            {
                newFilePath = "unknown";
            }

            foreach (var c in Path.GetInvalidFileNameChars()) 
            { 
                newFilePath = newFilePath.Replace(c, '-'); 
            }

            var cleanTitle = newBook.Title;

            foreach (var c in Path.GetInvalidFileNameChars()) 
            { 
                cleanTitle = cleanTitle.Replace(c, '-'); 
            }

            newFilePath = Path.Combine(newFilePath, cleanTitle);
            newFilePath = Path.Combine("Uploads", newFilePath);

            newFilePath = Helpers.CleanUpFileNames(newFilePath);
            
            newBook.Path = newFilePath;
            
            if (oldBook != null)
            {
                return Conflict($"Book with name [{oldBook.Title}] already exists by this author.");
            }
            
            var result = DataClass.Insert(newBook);

            if (result == 0)
            {
                return BadRequest();
            }

            foreach (var author in newBook.Authors)
            {
                var newAuthor = new Author
                {
                    Name = author
                };

                var res = DataClass.Insert(newAuthor);

                if (res == 0)
                {
                    continue;
                }
                
                DataClass.ExecuteNonQuery($"INSERT INTO book_authors (book_id, author_id) VALUES ('{newBook.Id}', '{newAuthor.Id}');");
            }

            var bookDirectory = Path.Combine(Directory.GetCurrentDirectory(), newFilePath);
            
            try
            {
                Directory.CreateDirectory(bookDirectory);
            }
            catch (Exception e)
            {
                return Problem(e.Message);
            }
            
            if (book.CoverImage != null)
            {
                newBook.HasCover = book.CoverImage != null;
                using var stream = new FileStream(Path.Combine(bookDirectory, "cover.jpg"), FileMode.Create);
                
                stream.Write(book.CoverImage);
                
            }

            var newBookPath = Path.Combine(bookDirectory, file.FileName);
            
            try
            {
                System.IO.File.Move(tempBookPath, newBookPath);
            }
            catch (Exception e)
            {
                return Problem(e.Message);
            }
            
            return Ok(result);
        }
    }
}
