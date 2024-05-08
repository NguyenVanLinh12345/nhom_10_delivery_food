const findOne = (id) => {
  return data.find((item) => item.id === id);
};

const findByEmailAndPassword = (email, password) => {
  return data.find(
    (item) =>
      item.email === email.toLowerCase() &&
      item.password === password.toLowerCase()
  );
};

const findAll = () => {
  return data;
};

export const restaurantModel = {
  findOne,
  findAll,
  findByEmailAndPassword,
};

const data = [
  {
    id: 1,
    address: "Tầng 9 - Tòa nhà 3D Center - Số 3 Duy Tân - Cầu Giấy",
    email: "nhahang@gmail.com",
    password: "123456",
    genre: "Indian",
    imgUrl: "https://images.foody.vn/res/g1/8887/prof/s576x330/foody-mobile-0drisngl-jpg-612-635781077873801273.jpg",
    lat: 41.087356,
    long: -73.862273,
    rating: 5,
    short_description: "Tầng 9 - Tòa nhà 3D Center",
    title: "Phở lý quốc sư",
    isRestaurant: true,
  },
  {
    id: 2,
    name: "Bún cá phương lâm",
    address: "L10 Tầng 10 - Tòa Vincom Center - Số 72 Lê Thánh Tông - Quận 1",
    email: "nhahang2@gmail.com",
    password: "123456",
    bacground:
      "https://images.foody.vn/res/g1/8887/prof/s576x330/foody-mobile-0drisngl-jpg-612-635781077873801273.jpg",
    isRestaurant: true,
  }
];
