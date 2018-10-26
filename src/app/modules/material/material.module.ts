import { MatButtonModule, MatTabsModule, MatCardModule, MatTooltipModule, MatDialogModule,
         MatSidenavModule, MatProgressBarModule, MatIconModule, MatSelectModule, MatTableModule,
         MatSlideToggleModule, MatListModule, MatInputModule, MatFormFieldModule, MatSnackBarModule,
         MatDividerModule, MatToolbarModule, MatTreeModule, MatExpansionModule , MatPaginatorModule
         , MatProgressSpinnerModule, MatBadgeModule,  MAT_SNACK_BAR_DEFAULT_OPTIONS, MatChipsModule, MatRadioModule} from '@angular/material';
         import { LayoutModule } from '@angular/cdk/layout';

import 'Hammerjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule, MatTableModule,
    MatButtonModule, MatDialogModule, MatRadioModule,
    MatTabsModule, MatSnackBarModule, MatChipsModule,
    MatCardModule, MatFormFieldModule,
    MatTooltipModule,
    MatProgressBarModule, LayoutModule,
    MatIconModule, MatBadgeModule, MatTreeModule,
    MatSidenavModule, MatToolbarModule,
    MatSelectModule, MatListModule, NgbRatingModule,
    MatSlideToggleModule, MatInputModule,
    MatDividerModule, MatPaginatorModule,
    MatExpansionModule , MatProgressSpinnerModule,

  ],
  exports: [
    MatButtonModule, MatTableModule,
    MatTabsModule, MatDialogModule,
    MatCardModule, MatTreeModule,
    MatTooltipModule, MatSnackBarModule,
    MatProgressBarModule, MatFormFieldModule,MatRadioModule,
    MatIconModule, MatInputModule, NgbRatingModule,
    MatSidenavModule, MatToolbarModule, MatChipsModule,
    MatSelectModule, MatListModule, LayoutModule,
    MatSlideToggleModule, MatBadgeModule,
    MatDividerModule, MatPaginatorModule,
    MatExpansionModule , MatProgressSpinnerModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000 }}
  ],
  declarations: []
})
export class MaterialModule { }
