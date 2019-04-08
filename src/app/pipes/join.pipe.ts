import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'joinP',
})
export class JoinPipe implements PipeTransform {
    transform(value: any[], separator: string) {
        if (!Array.isArray(value)) {
            return value
        }

        return value.join(separator)
    }
}
