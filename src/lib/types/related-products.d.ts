declare type RelatedProducts = {
  count: number;
  similarProducts: [
    {
      _id: string;
      title: string;
      imgCover: string;
      price: number;
      priceAfterDiscount: number;
      rateAvg: number;
      rateCount: number;
      similarityScore: number;
    },
  ];
};
declare type SimilarProducts = [
  {
    _id: string;
    title: string;
    imgCover: string;
    price: number;
    priceAfterDiscount: number;
    rateAvg: number;
    rateCount: number;
    similarityScore: number;
  },
];
