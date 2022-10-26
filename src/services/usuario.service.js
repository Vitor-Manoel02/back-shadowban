import {
  getPageProfileId,
  getInstagramProfileId,
  getNumberOfMedias,
  getMediasFromProfile,
  getCaptionByMediaId,
  getHashtagId,
  getListOfRecentHashTags,
} from './functions';

const getShadowBanStatus = async (token) => {
  const pageProfile = await getPageProfileId(token);
  const instagramProfileId = await getInstagramProfileId(pageProfile, token);
  // eslint-disable-next-line no-unused-vars
  const instagramMediaCount = await getNumberOfMedias(
    instagramProfileId,
    token
  );
  const mediaIdList = await getMediasFromProfile(instagramProfileId, token);

  // Search hashtags used in each post caption

  let hashTag = '';
  let idOfTheMediaFound = 0;
  // eslint-disable-next-line no-restricted-syntax
  for await (const media of mediaIdList) {
    const caption = await getCaptionByMediaId(media.id, token);
    const findHashTag = /#+[a-zA-Z0-9(_)]{1,}/.exec(caption);
    if (findHashTag) {
      // eslint-disable-next-line prefer-destructuring
      hashTag = findHashTag[0];
      idOfTheMediaFound = media.id;
      break;
    }
  }

  const hashtagId = await getHashtagId(
    instagramProfileId,
    hashTag.replace('#', ''),
    token
  );

  const listOfPostsWithSameHashTag = await getListOfRecentHashTags(
    hashtagId,
    instagramProfileId,
    token
  );

  let shadowBanned = false;
  // eslint-disable-next-line no-restricted-syntax
  for await (const recentIdOfTags of listOfPostsWithSameHashTag) {
    if (recentIdOfTags.id === idOfTheMediaFound) {
      shadowBanned = true;
    }
  }
  return shadowBanned;
};

// eslint-disable-next-line import/prefer-default-export
export { getShadowBanStatus };
