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

            var book = _context.Books.Include(b => b.Tags).FirstOrDefault(book => book.Id == id);

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

            var b = System.IO.File.ReadAllBytes(coverPath);        
            return File(b, "image/jpeg");
        }

        [HttpPost("upload")]
        public IActionResult UploadFile(IFormFile file)
        {
            var tempEbookPath = UploadHandler.UploadTemp(file);
            if (tempEbookPath == null)
            {
                return BadRequest();
            }

            var tempEbook = EpubReader.ReadBook(tempEbookPath);

            var authors = new List<Author>();
            
            foreach (var author in tempEbook.AuthorList)
            {
                var a = _context.Authors.Include(au => au.Books).FirstOrDefault(au => au.Name == author);

                if (a == null)
                {
                    var newAuthor = new Author
                    {
                        Name = author
                    };
                    
                    authors.Add(newAuthor);
                    
                    continue;
                }
                
                authors.Add(a);

                if (a.Books.Count <= 0)
                {
                    continue;
                }
                
                var oldBook = a.Books.FirstOrDefault(b => b.Title == tempEbook.Title);

                if (oldBook != null)
                {
                    return Conflict($"Existing book [{oldBook.Title}] already exists from author [{a.Name}]");
                }
            }

            var newBook = new Book
            {
                Title = tempEbook.Title,
                HasCover = tempEbook.CoverImage != null
            };

            foreach (var author in authors)
            {
                newBook.Authors.Add(author);
            }

            var newBookPath = UploadHandler.MoveBook(newBook, tempEbookPath);

            if (newBookPath == null)
            {
                return Problem();
            }

            if (newBook.HasCover)
            {
                var imageSaveResult = UploadHandler.SaveCover(newBookPath, tempEbook.CoverImage!);

                if (!imageSaveResult)
                {
                    return Problem();
                }
            }

            newBook.Path = newBookPath;

            _context.Books.Add(newBook);
            _context.SaveChanges();
            return Ok(newBook);
        }
    }
}
