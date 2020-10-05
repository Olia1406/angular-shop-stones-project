import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-more-about-stones',
  templateUrl: './more-about-stones.component.html',
  styleUrls: ['./more-about-stones.component.scss']
})
export class MoreAboutStonesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block:"end", inline: "nearest"});
  }
}
