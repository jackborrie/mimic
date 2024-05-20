import {Component, ContentChildren, QueryList, TemplateRef} from '@angular/core';
import {MimicTemplate}                                      from "../../directives/mimic-template.directive";

@Component({
  selector: 'm-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {

    @ContentChildren(MimicTemplate)
    templates!: QueryList<MimicTemplate>;

    protected getTemplate(columnName: string): TemplateRef<any> | null {
        let template = null;
        (this.templates as QueryList<MimicTemplate>).forEach(item => {
            if (item.getType().toLowerCase() === columnName.toLowerCase()) {
                template = item.template;
                return;
            }
        });

        return template;
    }
}
