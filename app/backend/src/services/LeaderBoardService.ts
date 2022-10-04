import TeamRepository from '../repositories/TeamRepository';

export default class LeaderBoardService {
  constructor(private teamModel:TeamRepository) { }

  // public calculate

  // calcular para cada time:
  // total de vitorias/derrotas/empates;
  // total de pontos
  // total de gols feitos e sofridos / balance
  // eficiencia

  // filtrar com findAll de matches os dados de homeTeam com inProgress: false para cada match
  // contabilizar dados
  // fazer um filter por time e forEach para cada game,
  // reduce para contar

  public async getAllWithMatches() {
    const allMatches = await this.teamModel.findAllWithMatches();
    return allMatches;
  }
}
