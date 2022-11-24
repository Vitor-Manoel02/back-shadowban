import axios from 'axios';

// async function tradeCodeForToken(code) {
//   try {
//     var axios = require('axios');
//     var qs = require('qs');
//     var data = qs.stringify({
//       'client_id': '812880569961304',
//       'client_secret': 'b2691206bea05c9e73af5a1005b9f10c',
//       'grant_type': 'authorization_code',
//       'redirect_uri': 'https://catalogador.com.br/',
//       'code': code
//     });
//     var config = {
//       method: 'post',
//       url: 'https://graph.facebook.com/oauth/access_token',
//       headers: {
//         'client_id': '812880569961304',
//         'client_secret': 'b2691206bea05c9e73af5a1005b9f10c',
//         'grant_type': 'authorization_code',
//         'redirect_uri': 'https://catalogador.com.br/',
//         'code': code,
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       data : data
//     };
//     const userDataReponse = await axios(config);
//     const { access_token } = userDataReponse.data;
//     return access_token;
//   } catch (error) {
//     console.log(error,"in tradeCodeForToken");
//     return null;
//   }
// }

async function getPageProfileId(token) {
  try {
    const userDataReponse = await axios.get(
      `https://graph.facebook.com/v15.0/me/accounts?fields=ids_for_pages&access_token=${token}`
    );

    const {
      data: [{ id }],
    } = userDataReponse.data;

    return id;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getInstagramProfileId(pageId, token) {
  try {
    const userDataReponse = await axios.get(
      `https://graph.facebook.com/v15.0/${pageId}?fields=instagram_business_account&access_token=${token}`
    );
    const {
      instagram_business_account: { id },
    } = userDataReponse.data;

    return id;
  } catch (error) {
    return null;
  }
}

// async function getNumberOfMedias(instagramProfileId, token) {
//   try {
//     const userDataReponse = await axios.get(
//       `https://graph.facebook.com/v15.0/${instagramProfileId}?fields=media_count&access_token=${token}`
//     );
//     const { media_count } = userDataReponse.data;

//     return media_count;
//   } catch (error) {
//     return null;
//   }
// }

async function getMediasFromProfile(instagramProfileId, token) {
  try {
    const userDataReponse = await axios.get(
      `https://graph.facebook.com/v15.0/${instagramProfileId}?fields=media&access_token=${token}`
    );

    return userDataReponse.data.media.data;
  } catch (error) {
    return null;
  }
}

async function getCaptionByMediaId(mediaId, token) {
  try {
    const mediaDataReponse = await axios.get(
      `https://graph.facebook.com/v15.0/${mediaId}?fields=media_url,timestamp,caption,permalink&access_token=${token}`
    );
    // return mediaDataReponse.data.caption;
    const { caption, media_url, timestamp, permalink, id } =
      mediaDataReponse.data;
    return {
      caption,
      media_url,
      timestamp,
      permalink,
      id,
    };
  } catch (error) {
    return null;
  }
}

async function getHashtagId(instagramProfileId, hashtagName, token) {
  try {
    const hashTagDataResponse = await axios.get(
      `https://graph.facebook.com/v15.0/ig_hashtag_search?user_id=${instagramProfileId}&q=${hashtagName}&access_token=${token}`
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
      `https://graph.facebook.com/v15.0/${tagId}/top_media?fields=id&user_id=${instagramId}&access_token=${token}`
    );
    const { data } = listOfRecentTags.data;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export {
  getInstagramProfileId,
  // tradeCodeForToken,
  getPageProfileId,
  // getNumberOfMedias,
  getMediasFromProfile,
  getCaptionByMediaId,
  getHashtagId,
  getListOfRecentHashTags,
};
