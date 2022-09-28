import FirebaseFirestore from "@google-cloud/firestore"

export const genericConverter = <T>() => ({
  toFirestore(data: T): FirebaseFirestore.DocumentData {
    return data;
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): T {
    return {
      id: snapshot.id,
      createdAt: snapshot.createTime.toDate(),
      updatedAt: snapshot.updateTime.toDate(),
      ...(snapshot.data() as T),
    };
  },
});
