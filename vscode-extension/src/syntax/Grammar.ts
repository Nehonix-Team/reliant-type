/**
 * Grammar Generator for ReliantType
 *
 * Generates TextMate grammar from centralized syntax definitions
 */

import * as G from "./mods/grammar";
import { runGrammar } from "./mods/grammar/runGrammar";

export class Grammar { 
  /**
   * Generate complete TextMate grammar for ReliantType
   */
  public generate(): any {
    return G.generateFortifyGrammar();
  }

  /** 
   * Write the generated grammar to file
   */
  public write(outputPath: string): void {
    G.writeGrammarFile(outputPath);
  }
}

if (require.main === module) {
  runGrammar();
}
