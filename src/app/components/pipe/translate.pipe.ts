import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'translate',
  standalone: true,
  pure:false
})
export class TranslatePipe implements PipeTransform {
  constructor(private translationService: TranslateService) {}

  transform(key: string): string {
    let translatedText = ''; 
    this.translationService.get(key).subscribe((res: string) => {
      translatedText = res;  // Get the translated value from ngx-translate
    });
    return translatedText;
  }
}
