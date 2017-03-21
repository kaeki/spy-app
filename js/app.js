
const spyArray = [
  {
    'id': 12,
    'time': '2017-03-02 22:55',
    'category': 'Wife',
    'title': 'Title 1',
    'details': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales enim eget leo condimentum vulputate. Sed lacinia consectetur fermentum. Vestibulum lobortis purus id nisi mattis posuere. Praesent sagittis justo quis nibh ullamcorper, eget elementum lorem consectetur. Pellentesque eu consequat justo, eu sodales eros.',
    'coordinates': {
      'lat': 60.2196781,
      'lng': 24.8079786,
    },
    'thumbnail': 'http://placekitten.com/320/300',
    'image': 'http://placekitten.com/768/720',
    'original': 'http://placekitten.com/2048/1920',
  },
  {
    'id': 15,
    'time': '2017-03-01 19:23',
    'category': 'Wife',
    'title': 'Title 2',
    'details': 'Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. Vestibulum tincidunt sapien eu ipsum tincidunt pulvinar. ',
    'coordinates': {'lat': 60.3196781, 'lng': 24.9079786},
    'thumbnail': 'http://placekitten.com/321/300',
    'image': 'http://placekitten.com/770/720',
    'original': 'http://placekitten.com/2041/1920',
  },
  {
    'id': 34,
    'time': '2017-12-04 09:45',
    'category': 'Girlfriend',
    'title': 'Title 3',
    'details': 'Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ',
    'coordinates': {'lat': 60.3196781, 'lng': 24.9079786},
    'thumbnail': 'http://placekitten.com/319/300',
    'image': 'http://placekitten.com/769/720',
    'original': 'http://placekitten.com/2039/1920',
  },
];

const view = {
  init: function() {
    this.container =$('#cont');
    this.render();
  },
  render: function() {
    const htmlStr = controller.getHtml();
    this.container.html(htmlStr);
  },
};

const controller = {
  getHtml: function() {
    const self = this;
    let htmlStr = '<div class="row">';
    let i = 0;
    spyArray.forEach(function(item) {
      i++;
      htmlStr += self.createCard(item);
      if(i == 3) {
        htmlStr += '</div><div class="row">';
      }
    });
    htmlStr += '</div>';
    return htmlStr;
  },
  getCardTemplate: function(item) {
    let detailsThumb = item.details;
    if(detailsThumb.length > 100) {
      detailsThumb = detailsThumb.substring(0, 100) + '...';
    }
    const htmlTemplate =
      `<div class="card">
        <img class="card-img-top" src=${item.thumbnail} alt="picture">
        <div class="card-block">
          <h4 class="card-title">${item.title}</h4>
          <h6 class="card-subtitle mb-2 text-muted">${item.time}</h6>
          <h6 class="card-subtitle mb-2 text-muted">${item.category}</h6>
          <p class="card-text">${detailsThumb}</p>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary">View</buttons>
        </div>
      </div>`;

    return htmlTemplate;
  },
  init: function() {
    view.init();
  },
};

controller.init();

