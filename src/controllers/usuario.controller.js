import { getShadowBanStatus } from '../services/usuario.service';
// eslint-disable-next-line max-len
//  Aqui é a segunda execução. Solicita o services>usuario.service.js e também informa o ?ticker=nome
//  Ele só solicita a função do service. poderia ser feita aqui também.

const ShadowSearch = async (req, res) => {
  const { token } = req.headers;
  const userData = await getShadowBanStatus(token);

  if(!userData){
    return res.status(200).json({
      message: 'Perfil com shadowban!',
      userStatus: 'shadowbanned',
    });
  }else{
    return res.status(200).json({
      message: 'Perfil sem shadowban!',
      userStatus: 'clean',
    });
  }
  
};

// eslint-disable-next-line import/prefer-default-export
export { ShadowSearch };
