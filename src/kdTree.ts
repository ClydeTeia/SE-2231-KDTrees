import Point2D from "./doNotTouch/point2D";
import RectHV from "./doNotTouch/rectHV";


export interface INode {
  point: Point2D;
  left: Node;
  right: Node;
  parent: Node;
}

export type Node = INode | undefined;

class KDNode implements INode {
  left: Node;
  right: Node;
  parent: Node;

  constructor(public point: Point2D) {}

  toString() {
    return this.point.toString();
  }
}

class KDTree {
  private root: Node;
  private size: number;

  public constructor() {
    this.root = undefined;
    this.size = 0;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }

  public getSize(): number {
    return this.size;
  }

  public insert(p: Point2D): void {
    this.root = this.insertRecursive(p, this.root, 0);
  }

  private insertRecursive(p: Point2D, node: Node, depth: number): Node {
    if (node === undefined) {
      this.size++;
      return new KDNode(p);
    }

    const axis = depth % 2 === 0 ? "x" : "y";
    if (p[axis] < node.point[axis]) {
      node.left = this.insertRecursive(p, node.left, depth + 1);
      node.left!.parent = node;
    } else {
      node.right = this.insertRecursive(p, node.right, depth + 1);
      node.right!.parent = node;
    }

    return node;
  }

  public contains(p: Point2D): boolean {
    return this.containsRecursive(p, this.root, 0);
  }

  private containsRecursive(p: Point2D, node: Node, depth: number): boolean {
    if (node === undefined) {
      return false;
    }

    if (p.equals(node.point)) {
      return true;
    }

    const axis = depth % 2 === 0 ? "x" : "y";
    if (p[axis] < node.point[axis]) {
      return this.containsRecursive(p, node.left, depth + 1);
    } else {
      return this.containsRecursive(p, node.right, depth + 1);
    }
  }

  public range(rect: RectHV): Point2D[] {
    const result: Point2D[] = [];
    this.rangeRecursive(rect, this.root, 0, result);
    return result;
  }

  private rangeRecursive(rect: RectHV, node: Node, depth: number, result: Point2D[]): void {
    if (node === undefined) {
      return;
    }

    if (rect.contains(node.point)) {
      result.push(node.point);
    }

    const axis = depth % 2 === 0 ? "x" : "y";
    if (axis === "x") {
      if (rect.xmin < node.point.x) {
        this.rangeRecursive(rect, node.left, depth + 1, result);
      }
      if (rect.xmax >= node.point.x) {
        this.rangeRecursive(rect, node.right, depth + 1, result);
      }
    } else {
      if (rect.ymin < node.point.y) {
        this.rangeRecursive(rect, node.left, depth + 1, result);
      }
      if (rect.ymax >= node.point.y) {
        this.rangeRecursive(rect, node.right, depth + 1, result);
      }
    }
}
}

export default KDTree;