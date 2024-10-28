// Values need to be declared as possible undefined "?" too because we're reusing the update function to remove the user's image and we cannot pass other information
interface UserInformation {
  image_url?: string;
  username?: string;
}

export type { UserInformation };
