import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { formatDistanceToNow } from "date-fns";

export interface PostCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

export function PostCard({ title, excerpt, date, slug }: PostCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <a href={`/blog/${slug}`}>
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>
            {formatDistanceToNow(new Date(date), { addSuffix: true })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{excerpt}</p>
        </CardContent>
      </a>
    </Card>
  );
}
