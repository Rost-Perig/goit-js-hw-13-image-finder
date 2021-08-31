import axios from '../../node_modules/axios';

export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.KEY = '22984321-98218ca8e9b1f3be57a008ac4&q';
        this.BASE_URL = 'https://pixabay.com/api/';
        this.page = 1;
        this.orientation = 'all';
        this.imgType = 'all';
    }

/* вариант используя async-away + axios + try-catch, который применен в ф-ции fetchAndRenderImages*/
    async fetchImages() {
            const url = `${this.BASE_URL}?image_type=${this.imgType}&orientation=${this.orientation}&page=${this.page}&per_page=12&key=${this.KEY}&q=${this.searchQuery}`;
            const response = await axios.get(url);
            this.incrementPage();
            return response.data.hits;
        }

 /* вариант используя axios или fetch */
    // fetchImages() {
    //     const url = `${this.BASE_URL}?image_type=${this.imgType}&orientationh=${tis.orientation}&page=${this.page}&per_page=12&key=${this.KEY}&q=${this.searchQuery}`;

/* используя axios */
        // return axios.get(url)
        //     .then(({data}) => {
        //         this.incrementPage();
        //         return data.hits;
        //     }).catch(catchError => {
        //         console.log(catchError);
        //     });
        //}
    
/* используя fetch */      
        // return fetch(url)
        //     .then(response => response.json())
        //     .then(({hits}) => {
        //         this.incrementPage();
        //         // console.log(hits);
        //         return hits;
        //     }).catch(catchError => {
        //         console.log(catchError);
        //     });
        //}

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}