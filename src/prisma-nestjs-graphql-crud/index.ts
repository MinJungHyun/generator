import { Rule, apply, applyTemplates, chain, mergeWith, url, move } from '@angular-devkit/schematics';

import { strings, normalize } from '@angular-devkit/core';

import { Schema } from './schema';

export function prismaNestjsGraphqlCrud(options: Schema): Rule {
  return async () => {
    const templateSource = apply(url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: options.name,
        kebabName: strings.dasherize(options.name),
        pascalName: strings.classify(options.name),
        camelName: strings.camelize(options.name)
      }),
      move(normalize(options.path || '')) // 이동 시킨다.
    ]);
    return chain([mergeWith(templateSource)]);
  };
}

