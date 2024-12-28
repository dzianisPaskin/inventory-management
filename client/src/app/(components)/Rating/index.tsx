import { FC } from "react";
import { Star } from "lucide-react";

type RatingProps = {
  rating: number;
};

export const Rating: FC<RatingProps> = ({ rating }) => {
  return [1, 2, 3, 4, 5].map((it) => (
    <Star key={it} size={16} color={it <= rating ? "#ffc107" : "#e4e5e9"} />
  ));
};
