import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';

import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';

const middlewareLink = new ApolloLink((op, forward) => {
  return forward(op).map(response => {
    console.log('Using App');
    return response;
  });
});

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ApolloModule,
    HttpLinkModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: middlewareLink.concat(
        httpLink.create({
          uri: 'https://1jzxrj179.lp.gql.zone/graphql',
        }),
      ),
      cache: new InMemoryCache(),
    });
  }
}
