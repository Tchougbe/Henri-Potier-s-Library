
export class BookServiceMock {

  fakeBooks = [
    {
      "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
      "title": "Henri Potier à l'école des sorciers",
      "price": 35,
      "cover": "http://henri-potier.xebia.fr/hp0.jpg",
      "synopsis": ["Synopsis1"]
    },
    {
      "isbn": "a460afed-e5e7-4e39-a39d-c885c05db861",
      "title": "Henri Potier et la Chambre des secrets",
      "price": 30,
      "cover": "http://henri-potier.xebia.fr/hp1.jpg",
      "synopsis": ["Synopsis2"]
    },
    {
      "isbn": "fcd1e6fa-a63f-4f75-9da4-b560020b6acc",
      "title": "Henri Potier et le Prisonnier d'Azkaban",
      "price": 30,
      "cover": "http://henri-potier.xebia.fr/hp2.jpg",
      "synopsis": ["Synopsis3"]
    },
    {
      "isbn": "c30968db-cb1d-442e-ad0f-80e37c077f89",
      "title": "Henri Potier et la Coupe de feu",
      "price": 29,
      "cover": "http://henri-potier.xebia.fr/hp3.jpg",
      "synopsis": ["Synopsis4"]
    },
  ]

  getBooks(): Promise<any>{
    return Promise.resolve(this.fakeBooks);
  }

}
