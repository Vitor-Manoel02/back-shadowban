import axios from 'axios';

async function getPageProfileId(token) {
  try {
    const userDataReponse = await axios.get(
      `https://graph.facebook.com/v15.0/me/accounts?fields=ids_for_pages&access_token=${token}`,
    );
    const {
      data: [{ id }],
    } = userDataReponse.data;
    return id;
  } catch (error) {
    return null;
  }
}

async function getInstagramProfileId(pageId, token) {
  try {
    const userDataReponse = await axios.get(
      `https://graph.facebook.com/v15.0/${pageId}?fields=instagram_business_account&access_token=${token}`,
    );
    const {
      instagram_business_account: { id },
    } = userDataReponse.data;

    return id;
  } catch (error) {
    return null;
  }
}

async function getNumberOfMedias(instagramProfileId, token) {
  try {
    const userDataReponse = await axios.get(
      `https://graph.facebook.com/v15.0/${instagramProfileId}?fields=media_count&access_token=${token}`,
    );
    const { media_count } = userDataReponse.data;

    return media_count;
  } catch (error) {
    return null;
  }
}

async function getMediasFromProfile(instagramProfileId, token) {
  try {
    const userDataReponse = await axios.get(
      `https://graph.facebook.com/v15.0/${instagramProfileId}?fields=media&access_token=${token}`,
    );

    return userDataReponse.data.media.data;
  } catch (error) {
    return null;
  }
}

async function getCaptionByMediaId(mediaId, token) {
  try {
    const mediaDataReponse = await axios.get(
      `https://graph.facebook.com/v15.0/${mediaId}?fields=media_url,timestamp,caption,permalink&access_token=${token}`,
    );
    // return mediaDataReponse.data.caption;
    const {
      caption, media_url, timestamp, permalink, id,
    } = mediaDataReponse.data;
    return {
      caption, media_url, timestamp, permalink, id,
    };
  } catch (error) {
    return null;
  }
}

async function getHashtagId(instagramProfileId, hashtagName, token) {
  try {
    const hashTagDataResponse = await axios.get(
      `https://graph.facebook.com/v15.0/ig_hashtag_search?user_id=${instagramProfileId}&q=${hashtagName}&access_token=${token}`,
    );
    const {
      data: [{ id }],
    } = hashTagDataResponse.data;
    return id;
  } catch (error) {
    return null;
  }
}

async function getListOfRecentHashTags(tagId, instagramId, token) {
  try {
    const listOfRecentTags = await axios.get(
      `https://graph.facebook.com/v15.0/${tagId}/recent_media?fields=id&user_id=${instagramId}&access_token=${token}`,
    );
    const { data } = listOfRecentTags.data;
    return data;
  } catch (error) {
    return null;
  }
}

export {
  getPageProfileId,
  getInstagramProfileId,
  getNumberOfMedias,
  getMediasFromProfile,
  getCaptionByMediaId,
  getHashtagId,
  getListOfRecentHashTags,
};
