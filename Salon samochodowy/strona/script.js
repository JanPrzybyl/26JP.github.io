const carList = document.querySelector('.car-list');
const carForm = document.getElementById('car-form');
const purchaseConfirmation = document.getElementById('purchase-confirmation');
const cars = [
    {
        image: 'zdjecia/LS ELEGANCE.jpg',
        price: 550000,
        year: 2023,
        model: 'LS',
        variant: 'ELEGANCE',
        productionYear: 2023,
        enginePower: '245KM',
        mileage: '50km'
    },
    {
        image: 'zdjecia/RX F SPORT.jpg',
        price: 490900,
        year: 2023,
        model: 'RX',
        variant: ' FSPORT',
        productionYear: 2023,
        enginePower: '371KM',
        mileage: '40km'
    },
    {
        image: 'zdjecia/RZ.jpg',
        price: 389900,
        year: 2023,
        model: 'RZ',
        variant: 'OMOTENASHI',
        productionYear: 2023,
        enginePower: '313KM',
        mileage: '47km'
    },
    {
        image: 'zdjecia/ES F SPORT.jpg',
        price: 307000,
        year: 2023,
        model: 'ES',
        variant: 'F SPORT',
        productionYear: 2023,
        enginePower: '218KM',
        mileage: '22km'
    },
    {
        image: 'zdjecia/LC500.jpg',
        price: 790600,
        year: 2023,
        model: 'LC',
        variant: 'Superturismo',
        productionYear: 2023,
        enginePower: '471KM',
        mileage: '31km'
    },
    {
        image: 'zdjecia/NX.jpg',
        price: 317900,
        year: 2023,
        model: 'NX',
        variant: 'F SPORT',
        productionYear: 2023,
        enginePower: '243KM',
        mileage: '66km'
    },
    {
        image: 'zdjecia/RC F.jpg',
        price: 651600,
        year: 2023,
        model: 'RC F',
        variant: 'Track Edition',
        productionYear: 2023,
        enginePower: '464KM',
        mileage: '28km'
    },
    {
        image: 'zdjecia/UX.jpg',
        price: 272900,
        year: 2023,
        model: 'UX',
        variant: 'BUSINESS',
        productionYear: 2023,
        enginePower: '204KM',
        mileage: '51km'
    }
];

let selectedCar;

function showConfigForm(carIndex) {
    selectedCar = cars[carIndex];

    carList.style.display = 'none';
    carForm.style.display = 'block';

    const carImage = selectedCar.image;

    document.getElementById('car-image').src = carImage;
    document.getElementById('total-price').textContent = selectedCar.price;
}

function goBack() {
    carForm.style.display = 'none';
    purchaseConfirmation.style.display = 'none';
    carList.style.display = 'block';
}

function validatePurchase(event) {
    event.preventDefault();

    const financingOption = document.querySelector('input[name="financing"]:checked');
    const ownerName = document.getElementById('owner-name').value;
    const deliveryDate = document.getElementById('delivery-date').value;
    const accessories = document.querySelectorAll('input[name="accessories"]:checked');

    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';

    if (!financingOption || !ownerName || !deliveryDate || accessories.length === 0) {
        errorMessage.textContent = 'Wszystkie pola muszą być wypełnione.';
        return;
    }

    const ownerNameParts = ownerName.split(' ');
    if (ownerNameParts.length !== 2) {
        errorMessage.textContent = 'Imię i nazwisko powinno zawierać 2 części oddzielone spacją.';
        return;
    }

    const selectedAccessories = Array.from(accessories).map(accessory => {
        const accessoryId = accessory.value;
        const accessoryLabel = document.querySelector(`label[for="accessory${accessoryId}"]`);
        const accessoryName = accessoryLabel.textContent.split(' (')[0];
        const accessoryPrice = accessoryLabel.textContent.match(/\d+/)[0];
        return { id: accessoryId, name: accessoryName, price: accessoryPrice };
    });

    const totalPrice = calculateTotalPrice(selectedCar.price, selectedAccessories);

    document.getElementById('payment-method').textContent = financingOption.value;
    document.getElementById('total-price').textContent = totalPrice;
    document.getElementById('car-image').src = selectedCar.image;
    purchaseConfirmation.style.display = 'block';

    document.querySelector('input[name="financing"]:checked').checked = false;
    document.getElementById('owner-name').value = '';
    document.getElementById('delivery-date').value = '';
    accessories.forEach(accessory => (accessory.checked = false));
}

function calculateTotalPrice(carPrice, accessories) {
    const accessoryPrices = accessories.map(accessory => Number(accessory.price));
    const totalAccessoryPrice = accessoryPrices.reduce((acc, cur) => acc + cur, 0);
    return carPrice + totalAccessoryPrice;
}

const deliveryDateSelect = document.getElementById('delivery-date');
const currentDate = new Date();
for (let i = 0; i < 14; i++) {
    const date = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
    const dateString = date.toLocaleDateString('en-US');
    const option = document.createElement('option');
    option.value = dateString;
    option.textContent = dateString;
    deliveryDateSelect.appendChild(option);
}
