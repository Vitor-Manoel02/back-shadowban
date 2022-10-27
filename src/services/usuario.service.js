import {
  getPageProfileId,
  getInstagramProfileId,
  getNumberOfMedias,
  getMediasFromProfile,
  getCaptionByMediaId,
  getHashtagId,
  getListOfRecentHashTags,
  tradeCodeForToken,
} from './functions';

const getShadowBanStatus = async (code) => {
  const token = await tradeCodeForToken(code);
  const pageProfile = await getPageProfileId(token);

  const instagramProfileId = await getInstagramProfileId(pageProfile, token);
  // eslint-disable-next-line no-unused-vars
  const instagramMediaCount = await getNumberOfMedias(
    instagramProfileId,
    token,
  );

  const listOfPostsFromProfile = await getMediasFromProfile(instagramProfileId, token);

  if (!listOfPostsFromProfile) return null

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

  const hashtagId = await getHashtagId(
    instagramProfileId,
    hashTag.replace('#', ''),
    token,
  );

  const listOfPostsWithSameHashTag = await getListOfRecentHashTags(
    hashtagId,
    instagramProfileId,
    token,
  );

  let shadowBanned = false;
  // eslint-disable-next-line no-restricted-syntax
  for await (const recentIdOfTags of listOfPostsWithSameHashTag) {
    if (recentIdOfTags.id === idOfTheMediaFound) {
      shadowBanned = true;
    }
  }
  return {
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
