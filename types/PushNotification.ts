export type PushNotification = {
  user_id: string;
  pushToken: string;
};

export type SendNotification = {
  title: string;
  body: string;
  data?: object | undefined;
};
