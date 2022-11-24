import {
  getShadowBanStatus,
  verifyPageAndProfile,
  verifyPostAndHashtag,
} from '../services/usuario.service.js';
// eslint-disable-next-line max-len
//  Aqui é a segunda execução. Solicita o services>usuario.service.js e também informa o ?ticker=nome
//  Ele só solicita a função do service. poderia ser feita aqui também.

const ShadowSearch = async (req, res) => {
  const { token } = req.headers;
  const userData = await getShadowBanStatus(token);

  if (userData.errors != 0)
    return res.status(500).json({
      message: 'ERRO:' + userData.errors,
    });

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

const sendverifyPageAndProfile = async (req, res) => {
  const { token } = req.headers;
  const userData = await verifyPageAndProfile(token);

  if (!userData.pageProfile)
    return res.status(500).json({
      message: 'Conta não vinculada com uma página de negócios do facebook.',
    });
  if (!userData.instagramProfileId)
    return res.status(500).json({
      message: 'Página não vinculada com um perfil do instagram.',
    });

  return res.status(200).json({
    message: 'Conexão com Facebook e Instagram realizado.',
  });
};

const verifyRecentPostWithHashtag = async (req, res) => {
  const { token } = req.headers;
  const userData = await verifyPostAndHashtag(token);
  if (!userData.hashtagId)
    return res.status(500).json({
      message: 'Conta não tem postagem recente com os critérios para análise.',
    });

  return res.status(200).json({
    message: 'Critérios de análise atendidos!',
  });
};

// eslint-disable-next-line import/prefer-default-export
export { ShadowSearch, sendverifyPageAndProfile, verifyRecentPostWithHashtag };
