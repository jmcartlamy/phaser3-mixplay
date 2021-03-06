import Interactive from '../api/interactive';
import { GAME_CONFIG, GameScenes } from '../constants';
import { PhaserGame } from '../types';

export default class LoadScene extends Phaser.Scene {
  public game: PhaserGame;

  constructor() {
    super({
      key: GameScenes.Load
    });
  }

  public init() {
    // @ts-ignore => 2nd argument is optional
    this.registry.set(GAME_CONFIG);
  }

  public async preload() {
    const label = this.add.text(10, 10, 'Connexion to Mixer...', {
      font: '16px Courier',
      fill: '#00ff00'
    });
    const token = await this.game.mixer.getToken();

    if (token) {
      label.text = 'Create an interactive game session...';

      this.game.interactive = new Interactive();
      this.game.interactive.setup(token, this.startMenuScene.bind(this));

      this.registry.set('isInteractive', true);
    } else {
      label.text = 'Failed...\n\nLaunch the game without mixplay.';

      setTimeout(this.startMenuScene.bind(this), 1000);
    }
  }

  private startMenuScene() {
    this.scene.start(GameScenes.Menu);
  }
}
