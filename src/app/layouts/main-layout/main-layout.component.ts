import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})

export class MainLayoutComponent {
  scrollTop() {
    window.scrollTo(0 ,0)
    //Scrolls the browser window to the specified coordinates.
  }
  //<scrollTop() method> scrolls the browser window to the top of the page when called.

  showBtn: boolean = false
  //Declares a public property named <showBtn> and initializes it to false. It control the visibility of a button or other element on the page.
  @HostListener('window:scroll') scrollToTop() {
  //Decorator that listens to the <window:scroll> event, so whenever the window is scrolled, the scrollTop() function will be executed.
    let scrollTop = document.documentElement.scrollTop
    //Declares a local variable <scrollTop> and assigns to it the current vertical scroll position of the page.
    //<document.documentElement.scrollTop>: Property which provides the current scroll position relative to the top of the document.
    if (scrollTop > 500) {
    //Checks if the current scroll position is greater than 500 pixels.
      this.showBtn = true
      //If the scroll position is greater than 500 pixels, this line sets the <showBtn> property to true, indicating that the button should be displayed.
    } else {
      this.showBtn = false
      //If the scroll position is less than or equal to 500 pixels, this line sets the <showBtn> property to false, indicating that the button should be hidden.
    }
  }
}