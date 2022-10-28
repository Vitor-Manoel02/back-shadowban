import { getShadowBanStatus } from '../services/usuario.service';
// eslint-disable-next-line max-len
//  Aqui é a segunda execução. Solicita o services>usuario.service.js e também informa o ?ticker=nome
//  Ele só solicita a função do service. poderia ser feita aqui também.

const ShadowSearch = async (req, res) => {
  const { token } = req.headers;
  const userData = await getShadowBanStatus(token);

  if(userData.errors!=0) return res.status(500).json({
    message: "ERRO:"+userData.errors,
  })

  if (!userData.shadowBanned) {
    return res.status(200).json({
      message: 'Perfil com shadowban!',
      userStatus: 'shadowbanned',
      token: userData.token,
    });
  }
  return res.status(200).json({
    message: 'Perfil sem shadowban!',
    userStatus: 'clean',
    token: userData.token,
  });
};

const UserData = async (req, res) => {
  const { token } = req.headers;
  const userData = await getShadowBanStatus(token);
  if(userData.errors!=0) return res.status(500).json({
    message: "ERRO:"+userData.errors,
  })

  return res.status(200).json({
    message: 'Perfil sem shadowban!',
    userStatus: 'clean',
    hashtagUsed: userData.hashTag,
    timestamp: userData.timestampOfMediaFound,
    media_url: userData.imageOfMediaFound,
    permalink: userData.permalinkOfMediaFound,
  });
};

// eslint-disable-next-line import/prefer-default-export
export { ShadowSearch, UserData };
