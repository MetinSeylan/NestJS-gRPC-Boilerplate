import { Injectable } from '@nestjs/common';
import { UserCollection } from '../../collections/user.collection';
import {
  DocumentData,
  FieldPath,
  Firestore,
  QueryDocumentSnapshot,
} from '@google-cloud/firestore';
import { from, map, Observable } from 'rxjs';
import { Span } from '@metinseylan/nestjs-opentelemetry';

@Injectable()
export class UserRepository {
  constructor(private readonly firestore: Firestore) {}

  public async findOne(id: string): Promise<UserCollection> {
    const querySnapshot = await this.firestore
      .collection(UserCollection.path())
      .where(FieldPath.documentId(), '==', id)
      .limit(1)
      .get();

    if (querySnapshot.empty) return;

    return UserRepository.fromEntity(querySnapshot.docs[0]);
  }

  @Span('user.save-db-operation')
  public async save(users: Partial<UserCollection>): Promise<UserCollection> {
    const document = this.firestore.collection(UserCollection.path()).doc();
    await document.set(users);

    return await this.findOne(document.id);
  }

  public listAll(): Observable<UserCollection> {
    const queryStream = this.firestore
      .collection(UserCollection.path())
      .orderBy('name', 'asc')
      .stream();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return from(queryStream).pipe(map(UserRepository.fromEntity));
  }

  public async findByName(name: string): Promise<UserCollection> {
    const querySnapshot = await this.firestore
      .collection(UserCollection.path())
      .where('name', '==', name)
      .limit(1)
      .get();

    if (querySnapshot.empty) return;

    return UserRepository.fromEntity(querySnapshot.docs[0]);
  }

  public async deleteAll(): Promise<void> {
    const querySnapshot = await this.firestore
      .collection(UserCollection.path())
      .get();

    for (const doc of querySnapshot.docs) {
      await doc.ref.delete();
    }
  }

  private static fromEntity(
    queryDocumentSnapshot: QueryDocumentSnapshot<UserCollection | DocumentData>,
  ): UserCollection {
    return {
      id: queryDocumentSnapshot.id,
      name: queryDocumentSnapshot.data().name,
    };
  }
}
