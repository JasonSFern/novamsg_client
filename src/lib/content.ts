export const userLiked = (likeData: any, userID: number | null) => {
  let status = false;
  if (likeData !== null && likeData.length > 0) {
    likeData.forEach((like: any) => {
      if (like.user_id === userID) {
        status = true;
      }
    });
  }
  return status;
};

export const itemCount = (items: any) => {
  return items && items.length > 0 ? items.length : 0;
};
