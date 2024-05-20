import Point2D from "./doNotTouch/point2D";
import RectHV from "./doNotTouch/rectHV";

class PointSET {
  private points: Set<Point2D>;

  public constructor() {
    this.points = new Set<Point2D>();
  }

  public isEmpty(): boolean {
    return this.points.size === 0;
  }

  public size(): number {
    return this.points.size;
  }

  public insert(p: Point2D): void {
    this.points.add(p);
  }

  public contains(p: Point2D): boolean {
    return this.points.has(p);
  }

  public draw(p: any): void {
    p.background(255);
    p.stroke(0);
    p.strokeWeight(2);
    for (const point of this.points) {
      p.point(point.x * p.width, point.y * p.height);
    }
  }

  public range(rect: RectHV): Point2D[] {
    const pointsInRange: Point2D[] = [];
    for (const point of this.points) {
      if (rect.contains(point)) {
        pointsInRange.push(point);
      }
    }
    return pointsInRange;
  }
}
export default PointSET;
