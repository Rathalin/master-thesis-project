// import { AuthMockService } from '@angular-micro-frontends/auth'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
  template: `
    <div class="flex flex-col items-center mt-10">
      <h1 class="text-3xl mb-4">Welcome to Module Federation</h1>
      <img
        src="../../../assets/cute_cat.jpg"
        alt="White baby cat"
        class="max-w-sm rounded-sm shadow-md"
        loading="eager"
      />
      <div class="mt-4 flex gap-2"></div>
    </div>
  `,
})
export class HomePageComponent {
  // constructor(public authService: AuthMockService) {}
}
