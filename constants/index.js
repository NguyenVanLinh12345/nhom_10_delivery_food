export const baseUrl = 'https://602c-27-73-8-142.ngrok-free.app';

export const featuredCategoriesData = [
  {
    "_createdAt": "2023-02-17T15:17:23Z",
    "_id": "91b64696-2f1e-45db-8162-7c20a476331c",
    "_rev": "4QA54HOcDc8FiINM5T83tl",
    "_type": "featured",
    "_updatedAt":
      "2023-02-17T18:29:47Z",
    "name": "Nếm thử sự khác biệt",
    "short_description":
      "Ngon, tươi, độc đáo, thơm ngon, chất lượng. "
  },
  {
    "_createdAt": "2023-02-17T15:18:05Z",
    "_id": "b05b4dda-1cdc-4994-ba86-e32d1471ec13",
    "_rev": "IaiTeP5TizMkFOqFMXTtz8",
    "_type": "featured",
    "_updatedAt": "2023-02-17T19:05:40Z",
    "name": "Vụ nổ hương vị",
    "short_description": "Sôi động, mãnh liệt, kích thích, rực rỡ, rực rỡ"
  },
  {
    "_createdAt": "2023-02-10T18:41:58Z",
    "_id": "ef820c31-f2b6-4446-b625-e797799e221d",
    "_rev": "I13aVDhieoHVSVfjQk071w",
    "_type": "featured",
    "_updatedAt": "2023-02-17T19:07:48Z",
    "name": "Ưu đãi gần bạn!",
    "short_description": "Nhận ưu đãi tuyệt vời"
  },
  {
    "_createdAt": "2023-02-17T15:18:29Z",
    "_id": "f64c7e94-5eb4-49a0-8aeb-f623963ccbca",
    "_rev": "I13aVDhieoHVSVfjQjpB2w",
    "_type": "featured",
    "_updatedAt": "2023-02-17T18:35:01Z",
    "name": "Thỏa mãn cơn thèm của bạn",
    "short_description": "Ngon miệng, đa dạng, thơm ngon, kem, giòn"
  }
];

const dishes = [
  {
    "_createdAt": "2023-02-10T16:53:58Z",
    "_id": "4ef33936-7846-4221-9c35-d527c6187a62",
    "_rev": "ldD1Qs3NBckfiopg82Rqij",
    "_type": "dish",
    "_updatedAt": "2023-02-12T19:16:27Z",
    "image": {
      "_type": "image", 
      "asset": {"_ref": "image-b0f2ea8a6d48ba18f2bc3d6cfee5d619f93c9f16-1332x749-png", "_type": "reference"}
    },
    "name": "Taco lốc xoáy",
    "price": 60000,
    "short_description": "Toranino Taco là một xe bán đồ ăn Mexico có trụ sở tại Toronto, cung cấp nhiều loại bánh taco, burritos, quesadillas thơm ngon và các món ăn lấy cảm hứng từ Mexico khác"
  },
  {
    "_createdAt": "2023-02-12T20:09:25Z",
    "_id": "cda89636-582b-4c51-8634-4b38d88bf542",
    "_rev": "y9vPMxf9gLnmeHqu0wpdaK", "_type":
      "dish",
    "_updatedAt": "2023-02-12T20:09:25Z",
    "image": {
      "_type": "image", 
      "asset": {"_ref": "image-5bd06796b3e3e01a6aa6e7ba0489217342607091-687x1031-png", "_type": "reference"}
    },
    "name": "Mì mè",
    "price": 80000,
    "short_description": "Một món mì thơm ngon kiểu Trung Quốc nấu với tỏi, gừng và dầu mè rồi dọn ra đĩa nóng hổi."
  },
  {
    "_createdAt": "2023-02-17T19:02:22Z",
    "_id": "e3f1a156-001a-4fe6-ae87-a4c3cbd70fac",
    "_rev": "I13aVDhieoHVSVfjQjywRw",
    "_type": "dish",
    "_updatedAt": "2023-02-17T19:02:22Z",
    "image": {
      "_type": "image", 
      "asset": {"_ref": "image-ccf892fabe036b7f59c489adf1e9f212683ffb21-500x333-png", "_type": "reference"}
    },
    "name": "Pesto Penne",
    "price": 50000,
    "short_description": "Một món mì Ý cổ điển gồm mì ống penne trộn với nước sốt sâu bọ đầy hương vị."
  }
]

export const restaurantsData = [
  {
    "_createdAt": "2023-02-10T16:48:35Z",
    "_id": "44eabeb1-9fd8-4c67-867b-1edfe6e97ee0",
    "_rev": "IaiTeP5TizMkFOqFMXU1G2",
    "_type": "restaurant",
    "_updatedAt": "2023-02-17T19:06:12Z",
    "address": "Số 12 cầu Giấy, Hà Nội",
    "image": { "_type": "image", "asset": { "_ref": "image-0b89d5a0c4d4c8b421f5109ebeb7f756c969e9b6-1780x1780-png", "_type": "reference" } },
    "lat": 18.953201969352946,
    "long": 72.81665850812362,
    "name": "Nhà hàng cỏ mây",
    "dishes": dishes,
    "rating": 4.5, 
    "short_description": "Chúng tôi cung cấp nhiều món ăn ngon để kích thích vị giác của bạn.",
    "type": { "name": "South Asian" }
  },
  {
    "_createdAt": "2023-02-17T18:31:06Z",
    "_id": "2d78bd7b-54f9-4a25-9aa0-83708ee25ede",
    "_rev": "IaiTeP5TizMkFOqFMXU6Rq",
    "_type": "restaurant",
    "_updatedAt": "2023-02-17T19:06:31Z",
    "address": " 456 S Main St, Newtown, CT",
    "image": { "_type": "image", "asset": { "_ref": "image-8cb3f6262149faefaea62a0f2a7ab9a4c13f6bf6-500x333-png", "_type": "reference" } },
    "lat": 41.125073,
    "long": -73.450036,
    "name": "Quán ăn hạnh phúc",
    "rating": 5,
    "dishes": dishes,
    "short_description": "Một địa điểm thú vị cho ẩm thực Mỹ hiện đại",
    "type": { "name": "IItalian" }
  },
  {
    "_createdAt": "2023-02-17T15:23:37Z",
    "_id": "3d5fddf8-8dbe-4945-9c82-6c73037bf56b",
    "_rev": "4QA54HOcDc8FiINM5T70Gc",
    "_type": "restaurant",
    "_updatedAt": "2023-02-17T18:25:31Z",
    "address": "Đường trần phú, Hà Nội",
    "dishes": dishes,
    "image": { "_type": "image", "asset": { "_ref": "image-3775e7a9721104a3f01e49b3528a34fe568668fb-1170x780-png", "_type": "reference" } },
    "lat": 37.2, "long": -122.3,
    "name": "Quán ăn vui vẻ",
    "rating": 3,
    "short_description":
      "Thức ăn ngon trong bầu không khí ấm cúng",
    "type": { "name": "Mexican" }
  }
]
