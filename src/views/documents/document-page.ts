import { Component, Inject, Input, OnInit } from '@angular/core';
import { PrismicService } from 'src/core/prismic';
import { Router, ActivatedRoute } from '@angular/router';
import { PrismicEditLink } from './prismic-edit-link';


@Component({
  selector: 'home',
  directives: [
    PrismicEditLink
  ],
  template: `
    <div *ngIf="document">
      <h2 [attr.data-wio-id]=document.id>
        {{document.slug}}
        <prismic-edit-link [docId]=document.id></prismic-edit-link>
      </h2>
      <div class="document-body" [innerHtml]=document.asHtml(linkResolver)></div>
    </div>
    <div *ngIf="loaded && !document">
      <h2>Not found!</h2>
    </div>
  `
})
export class DocumentPage implements OnInit {
  @Input() id: string;
  private sub: any;
  private document: any;
  private loaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prismic: PrismicService,
    @Inject('LinkResolver') private linkResolver: {(doc: any): string}
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.prismic.api().then((api) => api.getByID(id)).then((document) => {
        this.document = document;
        this.loaded = true;
      });
    })
  }

}
