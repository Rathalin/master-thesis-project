import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'cat-gallery-cat-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-slate-900 rounded-lg">
      <img class="rounded-lg" [src]="src" [alt]="alt" loading="lazy" />
    </div>
  `,
  styles: [],
})
export class CatImageComponent {
  @Input() src = ''
  @Input() alt = 'cat image'
}
