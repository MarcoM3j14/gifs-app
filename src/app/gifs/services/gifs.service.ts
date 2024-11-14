import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 's67OVP9Yo5LaJI4lbsoZAf07rWf5lCpR';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
    this.loadLocalStorage()
    // console.log('Tag History');
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeTagHistory(tag:string){
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag)
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if( !localStorage.getItem('history') ) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if ( this._tagsHistory.length === 0 ) return;
    this.seachTag( this._tagsHistory[0] );
  }

  seachTag( tag: string ): void{
    if( tag.length === 0) return;
    this.organizeTagHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)


    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe(res => {
        this.gifList = res.data;
      })

    // fetch('http://api.giphy.com/v1/gifs/search?api_key=s67OVP9Yo5LaJI4lbsoZAf07rWf5lCpR&q=halo&limit=10')
    // .then( resp => resp.json())
    // .then( data => console.log(data));
  }

}
