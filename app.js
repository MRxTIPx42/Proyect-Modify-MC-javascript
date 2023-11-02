class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(Product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="card text-center mb-4">
          <div class="card-body">
              <strong>Nombre del Producto</strong>: ${Product.name}
              <strong>Precio del Producto</strong>: ${Product.price}
              <strong>Año del Producto</strong>: ${Product.year}
              <a href="#" class="btn btn-danger" name="delete">Delete</a>
          </div>
        </div>
        `;
        productList.appendChild(element);
        //this.resetForm(); es una forma de resetear el formulario como la que puse donde se encuentra: ui.resetForm();

    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {
        if(element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove();
            //console.log(element.parentElement.parentElement.parentElement.remove()) esto es para ver que se elimina
            this.showMessage('¡Producto -ELIMINADO- exitosamente!', 'info'); //puedo ponerle color danger, o succes de nuevo.
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-5`;
        //'alert alert-' + cssClass
        div.appendChild(document.createTextNode(message));
        //Showing in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    // show message sirve como una cajita para mostrar dialogos, se ejecuta dependiendo de la 
    //acción a la que queremos que reaccione.
}

//Dom Events
document.getElementById('produc-form')
document.addEventListener('submit', function (e) { //La "e" es de evento
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;
        
        const product = new Product (name, price, year);
        
        const ui = new UI();

        if(name === '' || price === '' || year === '') {
            return ui.showMessage('Por favor complete los espacios vacios', 'danger');

        }
        ui.addProduct(product);
        ui.resetForm();
        ui.showMessage(`¡Se añadio el producto ${product.name} exitosamente!`, 'success');

        e.preventDefault();


    });

    document.getElementById('product-list').addEventListener('click', function(e) {
        const ui = new UI();
        ui.deleteProduct(e.target);
//Esto sirve para mostrar en la consola lo que se esta seleccionando: console.log(e.target)
    });