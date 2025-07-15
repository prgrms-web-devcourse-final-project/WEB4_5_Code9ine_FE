export interface UserData {
  name: string;
  profileImage: string;
  goalAmount: number;
  level: number;
  currentExp: number;
  nextLevelExp: number;
  expProgress: number;
  myPosts: {
    postId: number;
    title: string;
  }[];
}
