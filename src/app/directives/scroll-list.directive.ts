import {
  Directive,
  ElementRef,
  input,
  model,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  combineLatestWith,
  debounceTime,
  filter,
  Subject,
  Subscription,
  tap,
} from 'rxjs';
import { environment } from '../../environments/environment';
import { CONSTANTS } from '../constants';
import { EventsService } from '../services/events.service';

@Directive({
  selector: '[appScrollList]',
  standalone: true,
  host: {
    '(scroll)': 'onScroll($event)',
  },
})
export class ScrollListDirective implements OnInit, OnDestroy {
  private scrollSubscription!: Subscription;
  private resetScrollVariablesSubscription!: Subscription;
  private scrollEventSubject: Subject<Event> = new Subject<Event>();

  listLength = input.required<number>();
  itemsPerPage = input.required<number>();
  minNumber = model(CONSTANTS.LIST.DEFAULT_MIN_NUMBER);
  maxNumber = model(CONSTANTS.LIST.DEFAULT_MAX_NUMBER);

  constructor(
    private el: ElementRef,
    private scrollService: EventsService,
  ) {}

  ngOnInit(): void {
    this.scrollSubscription = this.scrollEventSubject
      .pipe(
        debounceTime(CONSTANTS.SCROLL.DEBOUNCE_TIME),
        combineLatestWith(this.scrollService.groupButtonClicked$),
        filter(([_scrollEvent, isGroupButtonClicked]: [Event, boolean]) => {
          return !isGroupButtonClicked;
        }),
        tap(([scrollEvent, _isGroupButtonClicked]: [Event, boolean]) => {
          this.scrollPageDetection(scrollEvent);
        }),
      )
      .subscribe();

    this.resetScrollVariablesSubscription =
      this.scrollService.groupButtonClicked$
        .pipe(
          filter((isGroupButtonClicked: boolean) => {
            return isGroupButtonClicked;
          }),
          tap(() => {
            this.resetVariables();
          }),
        )
        .subscribe();
  }

  ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe();
    this.resetScrollVariablesSubscription.unsubscribe();
  }

  private resetVariables() {
    this.scrollService.resetGroupButtonClick();
    this.el.nativeElement.scrollTo({
      top: CONSTANTS.SCROLL.TOP,
      behavior: CONSTANTS.SCROLL.BEHAVIOR,
    });
    this.minNumber.set(CONSTANTS.LIST.DEFAULT_MIN_NUMBER);
    this.maxNumber.set(this.itemsPerPage());
  }

  onScroll(event: Event): void {
    this.scrollEventSubject.next(event);
  }

  private scrollPageDetection(event: Event) {
    const target: HTMLElement = event.target as HTMLElement;
    const scrollPosition: number = target.scrollTop;
    const scrollHeight: number = target.scrollHeight - target.clientHeight;

    if (
      scrollPosition > scrollHeight - CONSTANTS.SCROLL.THRESHOLD_TRIGGER &&
      this.maxNumber() < this.listLength()
    ) {
      if (!environment.production) {
        console.log('%c ' + 'LoadNextPage', 'color: green; font-weight:bold');
      }
      this.loadNextPage();
    }

    if (
      scrollPosition < CONSTANTS.SCROLL.THRESHOLD_TRIGGER &&
      this.maxNumber() > this.doubleThanItemsPerPage()
    ) {
      if (!environment.production) {
        console.log('%c ' + 'LoadPreviousPage', 'color: red; font-weight:bold');
      }
      this.loadPreviousPage();
    }
  }

  private loadNextPage(): void {
    this.maxNumber.update((value) => value + this.itemsPerPage());
    const diff: number = this.maxNumber() - this.minNumber();
    if (diff > this.doubleThanItemsPerPage()) {
      this.minNumber.set(this.maxNumber() - this.doubleThanItemsPerPage());
    }
  }

  private loadPreviousPage(): void {
    this.minNumber.update((value) => value - this.itemsPerPage());
    const diff: number = this.maxNumber() - this.minNumber();
    if (diff > this.doubleThanItemsPerPage()) {
      this.maxNumber.set(this.minNumber() + this.doubleThanItemsPerPage());
    }
  }

  private doubleThanItemsPerPage(): number {
    return this.itemsPerPage() * CONSTANTS.LIST.DOUBLE;
  }
}
