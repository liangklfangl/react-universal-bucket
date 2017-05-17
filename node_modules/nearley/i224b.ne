@builtin "whitespace.ne"

@{%
  class Atom {
    constructor(name) { this.name = name; }
    toJSON(){ return this.name; }
  }
  class Juxt {
    constructor(left, right) { this.left = left; this.right = right; }
    toJSON(){ return [this.left.toJSON(), this.right.toJSON()]; }
  }
%}

TUPLE -> "(" _ PAIR_LEFT _ ")" {% d => d[2] %} | "(" _ PAIR_RIGHT _ ")" {% d => d[2] %}

PAIR_RIGHT ->
  LEAF _ "," _ LEAF {% d => new Juxt(d[0], d[4]) %}
| LEAF _ "," _ PAIR_RIGHT {% d => new Juxt(d[0], d[4]) %}
| LEAF _ "," _ PAIR_LEFT {% d => new Juxt(d[0], d[4]) %}
| PAIR_LEFT _ "," _ LEAF {% d => new Juxt(d[0], d[4]) %}
| PAIR_LEFT _ "," _ PAIR_LEFT {% d => new Juxt(d[0], d[4]) %}
| PAIR_LEFT _ "," _ PAIR_RIGHT {% d => new Juxt(d[0], d[4]) %}

PAIR_LEFT ->
  LEAF __ LEAF {% d => new Juxt(d[0], d[2]) %}
| PAIR_LEFT __ LEAF {% d => new Juxt(d[0], d[2]) %}

LEAF -> ATOM {% d => d[0] %} | TUPLE {% d => d[0] %}

ATOM -> [^\s()\n,]:+ {% d => new Atom(d[0].join('')) %}
