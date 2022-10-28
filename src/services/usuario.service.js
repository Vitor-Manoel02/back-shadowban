import {
  getPageProfileId,
  getInstagramProfileId,
  //getNumberOfMedias,
  getMediasFromProfile,
  getCaptionByMediaId,
  getHashtagId,
  getListOfRecentHashTags,
  tradeCodeForToken,
} from './functions';

const getShadowBanStatus = async (code) => {
  let errors = 0;

  const token = await tradeCodeForToken(code); //1 - Code to Token
  if (token == null) { errors = 1; return {errors} }

  const pageProfile = await getPageProfileId(token); //2 - Get's page profile ID
  if (pageProfile == null) { errors = 2; return {errors} }

  const instagramProfileId = await getInstagramProfileId(pageProfile, token);//3 - Get's Instagram Profile ID
  if (instagramProfileId == null) { errors = 3; return {errors} }

  //const instagramMediaCount = await getNumberOfMedias(instagramProfileId, token,);//4 - Get's Number of Medias in instagram profile
  
  const listOfPostsFromProfile = await getMediasFromProfile(instagramProfileId, token);//5 - List of medias from profile
  if (listOfPostsFromProfile == null) { errors = 5; return {errors} }

  // Search hashtags used in each post caption
  let hashTag = '';
  let idOfTheMediaFound = 0;
  let imageOfMediaFound = '';
  let permalinkOfMediaFound = '';
  let timestampOfMediaFound = '';
  // eslint-disable-next-line no-restricted-syntax

  for await (const media of listOfPostsFromProfile) {
    const caption = await getCaptionByMediaId(media.id, token);
    const findHashTag = /#+[a-zA-Z0-9(_)]{1,}/.exec(caption.caption);
    if (findHashTag) {
      // eslint-disable-next-line prefer-destructuring
      hashTag = findHashTag[0];
      idOfTheMediaFound = media.id;
      imageOfMediaFound = caption.media_url;
      permalinkOfMediaFound = caption.permalink;
      timestampOfMediaFound = caption.timestamp;
      break;
    }
  }

  const hashtagId = await getHashtagId(instagramProfileId, hashTag.replace('#', ''), token,); //6 - Gets the last used hashtag's ID
  if (hashtagId == null) { errors = 6; return {errors} }
  console.log("hashtagId: ",hashtagId);
  console.log("instagramProfileId: ",instagramProfileId);
  const listOfPostsWithSameHashTag = await getListOfRecentHashTags(hashtagId, instagramProfileId, token,); //7 - Search of the recent used posts with that hashtag
  if (listOfPostsWithSameHashTag == null) { errors = 7; return {errors} }

  let shadowBanned = false;
  console.log("IDOfMediaFound: ",idOfTheMediaFound);
  console.log("ListOfTries: ",listOfPostsWithSameHashTag);
  for await (const recentIdOfTags of listOfPostsWithSameHashTag) {
    
    if (recentIdOfTags.id === idOfTheMediaFound) {
      shadowBanned = true;
    }
  }
  
  return {
    errors,
    token,
    shadowBanned,
    hashTag,
    imageOfMediaFound,
    permalinkOfMediaFound,
    timestampOfMediaFound,
  };
};

// eslint-disable-next-line import/prefer-default-export
export { getShadowBanStatus };
