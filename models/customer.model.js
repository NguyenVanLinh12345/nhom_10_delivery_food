
const findOne = (id) => {
  return data.find((item) => item.id === id);
}

const findByEmailAndPassword = (email, password) => {
  return data.find((item) => item.email === email.toLowerCase() && item.password === password.toLowerCase());
}

const findAll = () => {
  return data;
}

export const customerModel = {
  findOne,
  findAll,
  findByEmailAndPassword
};

const data = [
  {
    id: 1,
    name: 'Trần Thanh Thế',
    address: '62 Đa sĩ, Kiến Hưng, Hà Đông',
    email: 'khachhang@gmail.com',
    password: '123456',
    backgroud: 'https://cdnphoto.dantri.com.vn/YAfcu9nd4T5dX06hhpaf19_QvY8=/thumb_w/960/2021/05/15/co-gai-noi-nhu-con-vi-anh-can-cuoc-xinh-nhu-mong-nhan-sac-ngoai-doi-con-bat-ngo-hon-2-1621075314070.jpg'
  },
  {
    id: 2,
    name: 'Nguyễn Văn A',
    address: 'L10 Tầng 10 - Tòa Vincom Center - Số 72 Lê Thánh Tông - Quận 1',
    email: 'khachhang2@gmail.com',
    password: '123456',
    bacground: 'https://www.vietnamfineart.com.vn/wp-content/uploads/2023/07/anh-gai-trung-quoc-cuc-dep-3.jpg'
  }
];