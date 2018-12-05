import { Component, ViewChild, OnInit } from '@angular/core';
import { Post } from './post';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-project';
  postArr: Array<Post>;
  selectedOptionA: string;
  selectedOptionB: string;
  selectedOptionC: string;
  selectedOptionD: string;
  correct: any = 0;
  inCorrect: any = 0;
  correctArray = [];
  errorA: boolean;
  errorB: boolean;
  errorC: boolean;
  errorD: boolean;
  public barChartLabels: string[] = ['Correct', 'InCorrect'];
  public barChartData: number[] = [0, 0];
  public barChartType = 'bar';
  @ViewChild('postForm') postForm;
  constructor(private dataservice: DataService) {
    this.dataservice.getPosts().subscribe((data: Array<Post>) => {
      this.postArr = data;
    }, () => console.log('Error Occurred'));
  }

  ngOnInit() {

  }

  reset() {
    this.barChartData = [0, 0];
    this.correct = 0;
    this.inCorrect = 0;
    this.correctArray = [];
    this.postForm.reset();
  }

  onSubmit() {
    this.errorA = this.selectedOptionA == undefined || this.selectedOptionA.length <= 0 ? true : false;
    this.errorB = this.selectedOptionB == undefined || this.selectedOptionB.length <= 0 ? true : false;
    this.errorC = this.selectedOptionC == undefined || this.selectedOptionC.length <= 0 ? true : false;
    this.errorD = this.selectedOptionD == undefined || this.selectedOptionD.length <= 0 ? true : false;

    if (!(this.errorA || this.errorB || this.errorC || this.errorD)) {
      this.correctArray.push(this.postArr[0].answer === this.selectedOptionA);
      this.correctArray.push(this.postArr[1].answer === this.selectedOptionB);
      this.correctArray.push(this.postArr[2].answer === this.selectedOptionC);
      this.correctArray.push(this.postArr[3].answer === this.selectedOptionD);
      for (let i = 0; i < this.correctArray.length; i++) {
        if (this.correctArray[i]) {
          this.correct = this.correct + 1;
        } else {
          this.inCorrect = this.inCorrect + 1;
        }
      }
      this.barChartLabels = ['Correct', 'InCorrect'];
      this.barChartData = [this.correct, this.inCorrect];
    }
  }
}
