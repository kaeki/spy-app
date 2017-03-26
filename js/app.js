const model = {
  init: function(url) {
    const self = this;
    const request = new Request(url);
    fetch(request).then((response) => {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Model init error');
    }).then((json) => {
      self.data = json;
      controller.modelReady();
    }).catch((error) => console.log('Error: ' + error ));
  },
  getData: function() {
    return this.data;
  },
};

const htmlTemplate = {
    card: function(item) {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        const img = this.createCardImg(item.thumbnail);
        const cardBlock = this.createCardBlock(item);
        const footer = this.createFooter(item);
        card.appendChild(img);
        card.appendChild(cardBlock);
        card.appendChild(footer);
        return card;
    },
    createCardImg: function(imgSrc) {
        const img = document.createElement('img');
        img.setAttribute('class', 'card-img-top');
        img.setAttribute('src', imgSrc);
        return img;
    },
    createCardBlock: function(item) {
        const cardBlock = document.createElement('div');
        cardBlock.setAttribute('class', 'card-block');
        const title = document.createElement('h4');
        title.setAttribute('class', 'card-title');
        title.innerText = item.title;
        cardBlock.appendChild(title);
        const subtitle = document.createElement('h6');
        subtitle.setAttribute('class', 'card-subtitle mb-2 text-muted');
        subtitle.innerText = this.formatTimeStamp(item.time);
        cardBlock.appendChild(subtitle);
        const details = document.createElement('p');
        details.setAttribute('class', 'card-text');
        details.innerText = this.getDetailsThumb(item.details);
        cardBlock.appendChild(details);

        return cardBlock;
    },
    createFooter: function(item) {
        const footer = document.createElement('div');
        footer.setAttribute('class', 'card-footer');
        const button = document.createElement('button');
        button.setAttribute('class', 'btn btn-primary');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#myModal');
        button.textContent = 'View';
        button.addEventListener('click', (evt)=> {
            modalView.setData(item);
        });
        footer.appendChild(button);

        return footer;
    },
    formatTimeStamp: function(time) {
      return new Date(time).toLocaleString('fi-FI');
    },
    getDetailsThumb: function(string) {
      if(string.length > 100) {
        return string.substring(0, 100) + '...';
      } else {
        return string;
      }
    },
};
const view = {
  init: function() {
    this.container = document.getElementById('cont');
    this.render();
  },
  render: function() {
    const data = controller.getData();
    const categories = controller.getAllCategories(data);
    categories.forEach( (category) => {
      this.createCategoryContainer(category);
    });
    for(const item of data) {
      const card = htmlTemplate.card(item);
      const row = document.getElementById(item.category+'-row');
      row.appendChild(card);
    }
  },
  createCategoryContainer: function(category) {
    const cont = document.createElement('div');
    cont.setAttribute('class', 'container');
    cont.setAttribute('id', category);
    cont.innerHTML = `<h1>${category}</h1>`;
    const row = this.createRow(category);
    cont.appendChild(row);
    this.container.appendChild(cont);
  },
  createRow: function(category) {
    const row = document.createElement('div');
    row.setAttribute('class', 'row');
    row.setAttribute('id', category+'-row');

    return row;
  },
};

const modalView = {
  init: function() {
    this.modal = document.getElementById('myModal');
    this.title = document.getElementById('modal-title');
    this.img = document.getElementById('modal-img');
    this.subtitle = document.getElementById('modal-subtitle');
    this.text = document.getElementById('modal-text');
  },
  setData: function(item) {
    this.title.textContent = item.title;
    this.img.src = item.image;
    this.subtitle.textContent = item.time + ' - ' + item.category;
    this.text.textContent = item.details;
    if(map.marker != null) {
      map.clearMarker();
    }
    map.setMarker(item.coordinates);
  },
};
const map = {
  init: function() {
    this.mapElem = document.getElementById('map');
    this.options = {
      center: {lat: 60.192059, lng: 24.945831},
      zoom: 10,
    };
    this.map = new google.maps.Map(this.mapElem, this.options);
  },
  setMarker: function(coord) {
    const coordinates = {lat: coord.lat, lng: coord.lng};
    this.marker = new google.maps.Marker({
      position: coordinates,
    });
    this.map.setCenter(coordinates);
    this.marker.setMap(this.map);
  },
  clearMarker: function() {
    this.marker.setMap(null);
  },
  getMap: function() {
    return this.map;
  },
};

const controller = {
  getData: function() {
    return model.getData();
  },
  getAllCategories: function(arr) {
    const categoriesList = [];
    arr.forEach( (item) => {
      if (!categoriesList.includes(item.category)) {
        categoriesList.push(item.category);
      }
    });

    return categoriesList;
    //  return arr.sort((a, b) => a.category.localeCompare(b.category));
  },
  init: function() {
    model.init('data.json');
  },
  modelReady: function() {
    map.init();
    modalView.init();
    view.init();
  },
};

window.onload = controller.init();


