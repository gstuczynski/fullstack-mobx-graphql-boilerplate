// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation | ISubscription;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    messages: Array<IMessage | null> | null;
    message: IMessage | null;
    me: IUser | null;
    dupa: IMessage | null;
  }

  interface IMessagesOnQueryArguments {
    offset?: string | null;
    count?: number | null;
    replyTo?: string | null;
  }

  interface IMessageOnQueryArguments {
    id: string;
  }

  interface IMessage {
    __typename: 'Message';
    id: string | null;
    timestamp: string | null;
    user: IUser | null;
    text: string | null;
    likes: Array<IUser | null> | null;
    replyTo: IMessage | null;
  }

  interface IUser {
    __typename: 'User';
    id: string | null;
    name: string;
    avatar: string | null;
  }

  interface IMutation {
    __typename: 'Mutation';
    addUser: IUser | null;
    changeName: IUser | null;
    like: IMessage | null;
    postTweet: IMessage | null;
  }

  interface IAddUserOnMutationArguments {
    name: string;
    avatar: string;
  }

  interface IChangeNameOnMutationArguments {
    id: string;
    name: string;
  }

  interface ILikeOnMutationArguments {
    msg: string;
    user: string;
  }

  interface IPostTweetOnMutationArguments {
    text: string;
    user: string;
    replyTo?: string | null;
  }

  interface ISubscription {
    __typename: 'Subscription';
    newMessages: IMessage | null;
  }
}

// tslint:enable
