var documenterSearchIndex = {"docs":
[{"location":"examples/predation/lotka-volterra/","page":"Lotka-Volterra Model","title":"Lotka-Volterra Model","text":"EditURL = \"https://github.com/AlgebraicJulia/AlgebraicPetri.jl/blob/master/examples/predation/lotka-volterra.jl\"","category":"page"},{"location":"examples/predation/lotka-volterra/#predation_example","page":"Lotka-Volterra Model","title":"Lotka-Volterra Model","text":"","category":"section"},{"location":"examples/predation/lotka-volterra/","page":"Lotka-Volterra Model","title":"Lotka-Volterra Model","text":"(Image: )","category":"page"},{"location":"examples/predation/lotka-volterra/","page":"Lotka-Volterra Model","title":"Lotka-Volterra Model","text":"using AlgebraicPetri\n\nusing OrdinaryDiffEq\nusing Plots\n\nusing Catlab\nusing Catlab.Graphics\nusing Catlab.WiringDiagrams\nusing Catlab.CategoricalAlgebra\nusing Catlab.Programs.RelationalPrograms\n\ndisplay_uwd(ex) = to_graphviz(ex, box_labels=:name, junction_labels=:variable, edge_attrs=Dict(:len=>\".75\"));\nnothing #hide","category":"page"},{"location":"examples/predation/lotka-volterra/#Step-1:-Define-the-building-block-Petri-nets-needed-to-construct-the-model","page":"Lotka-Volterra Model","title":"Step 1: Define the building block Petri nets needed to construct the model","text":"","category":"section"},{"location":"examples/predation/lotka-volterra/","page":"Lotka-Volterra Model","title":"Lotka-Volterra Model","text":"birth_petri = Open(PetriNet(1, 1=>(1,1)));\nGraph(birth_petri)","category":"page"},{"location":"examples/predation/lotka-volterra/","page":"Lotka-Volterra Model","title":"Lotka-Volterra Model","text":"predation_petri = Open(PetriNet(2, (1,2)=>(2,2)));\nGraph(predation_petri)","category":"page"},{"location":"examples/predation/lotka-volterra/","page":"Lotka-Volterra Model","title":"Lotka-Volterra Model","text":"death_petri = Open(PetriNet(1, 1=>()));\nGraph(death_petri)","category":"page"},{"location":"examples/predation/lotka-volterra/#Step-2:-Generate-models-using-a-relational-syntax","page":"Lotka-Volterra Model","title":"Step 2: Generate models using a relational syntax","text":"","category":"section"},{"location":"examples/predation/lotka-volterra/","page":"Lotka-Volterra Model","title":"Lotka-Volterra Model","text":"lotka_volterra = @relation (wolves, rabbits) begin\n  birth(rabbits)\n  predation(rabbits, wolves)\n  death(wolves)\nend\ndisplay_uwd(lotka_volterra)","category":"page"},{"location":"examples/predation/lotka-volterra/","page":"Lotka-Volterra Model","title":"Lotka-Volterra Model","text":"lv_dict = Dict(:birth=>birth_petri, :predation=>predation_petri, :death=>death_petri);\nlotka_petri = apex(oapply(lotka_volterra, lv_dict))\nGraph(lotka_petri)","category":"page"},{"location":"examples/predation/lotka-volterra/","page":"Lotka-Volterra Model","title":"Lotka-Volterra Model","text":"Generate appropriate vector fields, define parameters, and visualize solution","category":"page"},{"location":"examples/predation/lotka-volterra/","page":"Lotka-Volterra Model","title":"Lotka-Volterra Model","text":"u0 = [100, 10];\np = [.3, .015, .7];\nprob = ODEProblem(vectorfield(lotka_petri),u0,(0.0,100.0),p);\nsol = solve(prob,Tsit5(),abstol=1e-8);\nplot(sol)","category":"page"},{"location":"examples/predation/lotka-volterra/#Step-3:-Extend-your-model-to-handle-more-complex-phenomena","page":"Lotka-Volterra Model","title":"Step 3: Extend your model to handle more complex phenomena","text":"","category":"section"},{"location":"examples/predation/lotka-volterra/","page":"Lotka-Volterra Model","title":"Lotka-Volterra Model","text":"such as a small food chain between little fish, big fish, and sharks","category":"page"},{"location":"examples/predation/lotka-volterra/","page":"Lotka-Volterra Model","title":"Lotka-Volterra Model","text":"dual_lv = @relation (fish, Fish, Shark) begin\n  birth(fish)\n  predation(fish, Fish)\n  predation(Fish, Shark)\n  death(Fish)\n  death(Shark)\nend\ndisplay_uwd(dual_lv)","category":"page"},{"location":"examples/predation/lotka-volterra/","page":"Lotka-Volterra Model","title":"Lotka-Volterra Model","text":"dual_lv_petri = apex(oapply(dual_lv, lv_dict))\nGraph(dual_lv_petri)","category":"page"},{"location":"examples/predation/lotka-volterra/","page":"Lotka-Volterra Model","title":"Lotka-Volterra Model","text":"Generate a new solver, provide parameters, and analyze results","category":"page"},{"location":"examples/predation/lotka-volterra/","page":"Lotka-Volterra Model","title":"Lotka-Volterra Model","text":"u0 = [100, 10, 2];\np = [.3, .015, .7, .017, .35];\nprob = ODEProblem(vectorfield(dual_lv_petri),u0,(0.0,100.0),p);\nsol = solve(prob,Tsit5(),abstol=1e-6);\nplot(sol)","category":"page"},{"location":"api/#Library-Reference","page":"Library Reference","title":"Library Reference","text":"","category":"section"},{"location":"api/","page":"Library Reference","title":"Library Reference","text":"Modules = [AlgebraicPetri]","category":"page"},{"location":"api/#AlgebraicPetri.AlgebraicPetri","page":"Library Reference","title":"AlgebraicPetri.AlgebraicPetri","text":"Computing in the category of finite sets and Petri cospans\n\n\n\n\n\n","category":"module"},{"location":"examples/covid/epidemiology/","page":"Basic Epidemiology Models","title":"Basic Epidemiology Models","text":"EditURL = \"https://github.com/AlgebraicJulia/AlgebraicPetri.jl/blob/master/examples/covid/epidemiology.jl\"","category":"page"},{"location":"examples/covid/epidemiology/#epidemiology_example","page":"Basic Epidemiology Models","title":"Basic Epidemiology Models","text":"","category":"section"},{"location":"examples/covid/epidemiology/","page":"Basic Epidemiology Models","title":"Basic Epidemiology Models","text":"(Image: )","category":"page"},{"location":"examples/covid/epidemiology/","page":"Basic Epidemiology Models","title":"Basic Epidemiology Models","text":"using AlgebraicPetri\nusing AlgebraicPetri.Epidemiology\n\nusing LabelledArrays\nusing OrdinaryDiffEq\nusing Plots\n\nusing Catlab\nusing Catlab.Graphics\nusing Catlab.WiringDiagrams\nusing Catlab.CategoricalAlgebra\nusing Catlab.Programs.RelationalPrograms\n\ndisplay_uwd(ex) = to_graphviz(ex, box_labels=:name, junction_labels=:variable, edge_attrs=Dict(:len=>\".75\"));\nnothing #hide","category":"page"},{"location":"examples/covid/epidemiology/#SIR-Model:","page":"Basic Epidemiology Models","title":"SIR Model:","text":"","category":"section"},{"location":"examples/covid/epidemiology/","page":"Basic Epidemiology Models","title":"Basic Epidemiology Models","text":"define model","category":"page"},{"location":"examples/covid/epidemiology/","page":"Basic Epidemiology Models","title":"Basic Epidemiology Models","text":"sir = @relation (s,i,r) begin\n    infection(s,i)\n    recovery(i,r)\nend\ndisplay_uwd(sir)","category":"page"},{"location":"examples/covid/epidemiology/","page":"Basic Epidemiology Models","title":"Basic Epidemiology Models","text":"p_sir = apex(oapply_epi(sir))\nGraph(p_sir)","category":"page"},{"location":"examples/covid/epidemiology/","page":"Basic Epidemiology Models","title":"Basic Epidemiology Models","text":"define initial states and transition rates, then create, solve, and visualize ODE problem","category":"page"},{"location":"examples/covid/epidemiology/","page":"Basic Epidemiology Models","title":"Basic Epidemiology Models","text":"u0 = LVector(S=10, I=1, R=0);\np = LVector(inf=0.4, rec=0.4);\nnothing #hide","category":"page"},{"location":"examples/covid/epidemiology/","page":"Basic Epidemiology Models","title":"Basic Epidemiology Models","text":"The C-Set representation has direct support for generating a DiffEq vector field","category":"page"},{"location":"examples/covid/epidemiology/","page":"Basic Epidemiology Models","title":"Basic Epidemiology Models","text":"prob = ODEProblem(vectorfield(p_sir),u0,(0.0,7.5),p);\nsol = solve(prob,Tsit5())\n\nplot(sol)","category":"page"},{"location":"examples/covid/epidemiology/#SEIR-Model:","page":"Basic Epidemiology Models","title":"SEIR Model:","text":"","category":"section"},{"location":"examples/covid/epidemiology/","page":"Basic Epidemiology Models","title":"Basic Epidemiology Models","text":"define model","category":"page"},{"location":"examples/covid/epidemiology/","page":"Basic Epidemiology Models","title":"Basic Epidemiology Models","text":"seir = @relation (s,e,i,r) begin\n    exposure(s,i,e)\n    illness(e,i)\n    recovery(i,r)\nend\ndisplay_uwd(seir)","category":"page"},{"location":"examples/covid/epidemiology/","page":"Basic Epidemiology Models","title":"Basic Epidemiology Models","text":"p_seir = apex(oapply_epi(seir))\nGraph(p_seir)","category":"page"},{"location":"examples/covid/epidemiology/","page":"Basic Epidemiology Models","title":"Basic Epidemiology Models","text":"define initial states and transition rates, then create, solve, and visualize ODE problem","category":"page"},{"location":"examples/covid/epidemiology/","page":"Basic Epidemiology Models","title":"Basic Epidemiology Models","text":"u0 = LVector(S=10, E=1, I=0, R=0);\np = LVector(exp=.9, ill=.2, rec=.5);\n\nprob = ODEProblem(vectorfield(p_seir),u0,(0.0,15.0),p);\nsol = solve(prob,Tsit5())\n\nplot(sol)","category":"page"},{"location":"examples/covid/epidemiology/#SEIRD-Model:","page":"Basic Epidemiology Models","title":"SEIRD Model:","text":"","category":"section"},{"location":"examples/covid/epidemiology/","page":"Basic Epidemiology Models","title":"Basic Epidemiology Models","text":"define model","category":"page"},{"location":"examples/covid/epidemiology/","page":"Basic Epidemiology Models","title":"Basic Epidemiology Models","text":"seird = @relation (s,e,i,r,d) begin\n    exposure(s,i,e)\n    illness(e,i)\n    recovery(i,r)\n    death(i,d)\nend\ndisplay_uwd(seird)","category":"page"},{"location":"examples/covid/epidemiology/","page":"Basic Epidemiology Models","title":"Basic Epidemiology Models","text":"p_seird = apex(oapply_epi(seird))\nGraph(p_seird)","category":"page"},{"location":"examples/covid/epidemiology/","page":"Basic Epidemiology Models","title":"Basic Epidemiology Models","text":"define initial states and transition rates, then create, solve, and visualize ODE problem","category":"page"},{"location":"examples/covid/epidemiology/","page":"Basic Epidemiology Models","title":"Basic Epidemiology Models","text":"u0 = LVector(S=10, E=1, I=0, R=0, D=0);\np = LVector(exp=0.9, ill=0.2, rec=0.5, death=0.1);\n\nprob = ODEProblem(vectorfield(p_seird),u0,(0.0,15.0),p);\nsol = solve(prob,Tsit5())\n\nplot(sol)","category":"page"},{"location":"examples/covid/chime/chime-cset/","page":"-","title":"-","text":"EditURL = \"https://github.com/AlgebraicJulia/AlgebraicPetri.jl/blob/master/examples/covid/chime/chime-cset.jl\"","category":"page"},{"location":"examples/covid/chime/chime-cset/","page":"-","title":"-","text":"using AlgebraicPetri\nusing OrdinaryDiffEq\nusing Plots\nusing Catlab.Meta\nusing JSON\n\nimport OrdinaryDiffEq: ODEProblem\nODEProblem(p::LabelledReactionNet, t) = ODEProblem(vectorfield(p), concentrations(p), t, rates(p))","category":"page"},{"location":"examples/covid/chime/chime-cset/","page":"-","title":"-","text":"help capture JSON of defined functions","category":"page"},{"location":"examples/covid/chime/chime-cset/","page":"-","title":"-","text":"macro capture(funcname, exname, ex)\n    quote\n        $(esc(exname)) = $(repr(strip_lines(ex, recurse=true)))\n        $(esc(funcname)) = $ex\n    end\nend\n\n@capture γ γ_text 1/14\n@capture β β_text t->begin\n    policy_days = [20,60,120] .+ 17\n    contact_rate = 0.05\n    pol = findfirst(x->t<=x, policy_days) # array of days when policy changes\n    growth_rate = pol == 1 ? 0.0 : (2^(1/((pol-1)*5)) - 1) # growth rate depending on policy\n    return (growth_rate + γ) / 990 * (1-contact_rate) # calculate rate of infection\nend\n\nsir_cset= LabelledReactionNet{Function, Float64}((:S=>990, :I=>10, :R=>0), (:inf, β)=>((:S, :I)=>(:I,:I)), (:rec, t->γ)=>(:I=>:R))\n\nGraph(sir_cset)\n\nprob = ODEProblem(sir_cset, (17.0, 120.0))\nsol = OrdinaryDiffEq.solve(prob,Tsit5())\nplot(sol)\n\n# Getting Sharable JSON\nsir_cset_string = LabelledReactionNet{String, Int}((:S=>990, :I=>10, :R=>0), (:inf, β_text)=>((:S, :I)=>(:I,:I)), (:rec, γ_text)=>(:I=>:R))\nJSON.print(sir_cset_string.tables, 2)","category":"page"},{"location":"examples/covid/chime/chime/","page":"-","title":"-","text":"EditURL = \"https://github.com/AlgebraicJulia/AlgebraicPetri.jl/blob/master/examples/covid/chime/chime.jl\"","category":"page"},{"location":"examples/covid/chime/chime/","page":"-","title":"-","text":"using AlgebraicPetri\nusing AlgebraicPetri.Epidemiology\n\nusing OrdinaryDiffEq\nusing LabelledArrays\nusing Plots\n\nusing Catlab.Theories\nusing Catlab.Graphics\nusing Catlab.CategoricalAlgebra\nusing Catlab.Programs.RelationalPrograms\n\ndisplay_uwd(ex) = to_graphviz(ex, box_labels=:name, junction_labels=:variable, edge_attrs=Dict(:len=>\".75\"));\n\nsir = @relation (s, i, r) where (s, i, r) begin\n    infection(s, i)\n    recovery(i, r)\nend\ndisplay_uwd(sir)","category":"page"},{"location":"examples/covid/chime/chime/","page":"-","title":"-","text":"p_sir = apex(oapply_epi(sir));\nGraph(p_sir)\n\nu0 = LVector(S=990, I=10, R=0);\nt_span = (17.0,120.0)\n\nγ = 1/14\nβ = t->begin\n    policy_days = [20,60,120] .+ 17\n    contact_rate = 0.05\n    pol = findfirst(x->t<=x, policy_days) # array of days when policy changes\n    growth_rate = pol == 1 ? 0.0 : (2^(1/((pol-1)*5)) - 1) # growth rate depending on policy\n    return (growth_rate + γ) / 990 * (1-contact_rate) # calculate rate of infection\nend\np = LVector(inf=β, rec=γ);\n\nprob = ODEProblem(vectorfield(p_sir),u0,t_span,p)\nsol = OrdinaryDiffEq.solve(prob,Tsit5())\nplot(sol)\npng(\"ode-chime.png\")","category":"page"},{"location":"#AlgebraicPetri.jl","page":"AlgebraicPetri.jl","title":"AlgebraicPetri.jl","text":"","category":"section"},{"location":"","page":"AlgebraicPetri.jl","title":"AlgebraicPetri.jl","text":"CurrentModule = AlgebraicPetri","category":"page"},{"location":"","page":"AlgebraicPetri.jl","title":"AlgebraicPetri.jl","text":"AlgebraicPetri.jl is a Julia library for building Petri net agent based models compositionally. This library acts as a bridge between Catlab.jl and Petri.jl. This package defines the category of Open Petri Nets as described in [Baez 2018].","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"EditURL = \"https://github.com/AlgebraicJulia/AlgebraicPetri.jl/blob/master/examples/covid/coexist/coexist.jl\"","category":"page"},{"location":"examples/covid/coexist/coexist/#coexist_example","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"","category":"section"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"(Image: )","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"using AlgebraicPetri\n\nusing LabelledArrays\nusing OrdinaryDiffEq\nusing Plots\nusing JSON\n\nusing Catlab\nusing Catlab.CategoricalAlgebra\nusing Catlab.Graphics\nusing Catlab.Programs\nusing Catlab.Theories\nusing Catlab.WiringDiagrams\n\ndisplay_uwd(ex) = to_graphviz(ex, box_labels=:name, junction_labels=:variable, edge_attrs=Dict(:len=>\"1\"));\nnothing #hide","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"Define helper functions for defining the two types of reactions in an epidemiology Model. Either a state spontaneously changes, or one state causes another to change","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"ob(x::Symbol,n::Int) = codom(Open([x], LabelledReactionNet{Number,Int}(x=>n), [x])).ob;\nfunction spontaneous_petri(transition::Symbol, rate::Number,\n                           s::Symbol, s₀::Int,\n                           t::Symbol, t₀::Int)\n    Open(LabelledReactionNet{Number,Int}(unique((s=>s₀,t=>t₀)), (transition,rate)=>(s=>t)))\nend;\nfunction exposure_petri(transition::Symbol, rate::Number,\n                        s::Symbol, s₀::Int,\n                        e::Symbol, e₀::Int,\n                        t::Symbol, t₀::Int)\n    Open(LabelledReactionNet{Number,Int}(unique((s=>s₀,e=>e₀,t=>t₀)), (transition,rate)=>((s,e)=>(t,e))))\nend;\nnothing #hide","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"Set arrays of initial conditions and rates to use in functor","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"pop = [8044056, 7642473, 8558707, 9295024,8604251,9173465,7286777,5830635,3450616] .- (4*1000);\nN = sum(pop) + length(pop)*4*1000;\nsocial_mixing_rate =\n  [[5.10316562022642,1.28725377551533,1.30332531065247,2.31497083312315,1.1221598200343,0.606327539457772,0.453266757158743,0.177712174722219,0.0111726265254263],\n   [1.15949254996891,8.00118824220649,1.24977685411394,1.51298690806342,1.88877951844257,0.835804485358679,0.431371281973645,0.343104864504218,0.0324429672946592],\n   [1.19314902456243,1.2701954426234,3.55182053724384,1.81286158254244,1.80561825747571,1.29108026766182,0.708613434860661,0.248559044477893,0.0215323291988856],\n   [1.83125260045684,1.32872195974583,1.56648238384012,2.75491288061819,1.94613663227464,1.2348814962672,0.863177586322153,0.244623623638873,0.0394364256673532],\n   [0.910395333788561,1.7011898591446,1.60014517035071,1.99593275526656,2.90894801031624,1.37683234043657,0.859519958701156,0.488960115017174,0.110509077357166],\n   [0.56560186656657,0.865574490657954,1.31557291022074,1.45621698394508,1.58310342861768,1.92835669973181,0.963568493650797,0.463041280007004,0.183483677017087],\n   [0.544954016221808,0.575775829452094,0.930622416907882,1.31190809759635,1.27375718214796,1.24189546255302,1.32825334016313,0.66235513907445,0.0946971569608397],\n   [0.319717318035767,0.68528632728864,0.488468642570909,0.556345582530282,1.08429412751444,0.893028152305907,0.991137484161889,1.17651345255182,0.12964732712923],\n   [0.201086389216809,0.648252461859761,0.423327560644352,0.897268061280577,2.4516024037254,3.54014694719397,1.41761515077768,1.29700599099082,1.0189817510854]];\n\nfatality_rate = [0.00856164, 0.03768844, 0.02321319, 0.04282494, 0.07512237, 0.12550367, 0.167096  , 0.37953452, 0.45757006];\nnothing #hide","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"Define an oapply function that connects the building block Petri nets to the operations we will use in the model.","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"F(ex, n) = oapply(ex, Dict(\n    :exposure=>exposure_petri(Symbol(:exp_, n), 1*social_mixing_rate[n][n]/pop[n], Symbol(:S,n), pop[n], Symbol(:I,n), 1000, Symbol(:E,n), 1000),\n    :exposure_e=>exposure_petri(Symbol(:exp_e, n), .01*social_mixing_rate[n][n]/pop[n], Symbol(:S,n), pop[n], Symbol(:E,n),1000, Symbol(:E,n),1000),\n    :exposure_i2=>exposure_petri(Symbol(:exp_i2, n), 6*social_mixing_rate[n][n]/pop[n], Symbol(:S,n), pop[n], Symbol(:I2,n), 1000, Symbol(:E,n),1000),\n    :exposure_a=>exposure_petri(Symbol(:exp_a, n), 5*social_mixing_rate[n][n]/pop[n], Symbol(:S,n), pop[n], Symbol(:A,n),1000, Symbol(:E,n),1000),\n    :progression=>spontaneous_petri(Symbol(:prog_, n), .25, Symbol(:I,n), 1000, Symbol(:I2,n), 1000),\n    :asymptomatic_infection=>spontaneous_petri(Symbol(:asymp_, n), .86/.14*.2, Symbol(:E,n), 1000, Symbol(:A,n), 1000),\n    :illness=>spontaneous_petri(Symbol(:ill_, n), .2, Symbol(:E,n), 1000, Symbol(:I,n), 1000),\n    :asymptomatic_recovery=>spontaneous_petri(Symbol(:arec_, n), 1/15, Symbol(:A,n), 1000, Symbol(:R,n), 0),\n    :recovery=>spontaneous_petri(Symbol(:rec_, n), 1/6, Symbol(:I2,n), 1000, Symbol(:R,n), 0),\n    :recover_late=>spontaneous_petri(Symbol(:rec2_, n), 1/15, Symbol(:R,n), 0, Symbol(:R2,n), 0),\n    :death=>spontaneous_petri(Symbol(:death2_, n), (1/15)*(fatality_rate[n]/(1-fatality_rate[n])), Symbol(:I2,n), 1000, Symbol(:D,n), 0)));\nnothing #hide","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"Define the COEXIST model using the @relation macro","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"coexist = @relation (s, e, i, i2, a, r, r2, d) begin\n    exposure(s, i, e)\n    exposure_i2(s, i2, e)\n    exposure_a(s, a, e)\n    exposure_e(s, e, e)\n    asymptomatic_infection(e, a)\n    asymptomatic_recovery(a, r)\n    illness(e, i)\n    progression(i, i2)\n    death(i2, d)\n    recovery(i2, r)\n    recover_late(r, r2)\nend;\ndisplay_uwd(coexist)","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"Define an oapply function that can be used to create a model of cross exposure between two sets of populations","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"F_cx(ex, x,y) = oapply(ex, Dict(\n    :exposure=>exposure_petri(Symbol(:exp_, x,y), 1*social_mixing_rate[x][y]/(pop[x]+pop[y]), Symbol(:S,x), pop[x], Symbol(:I,y), 1000, Symbol(:E,x), 1000),\n    :exposure_e=>exposure_petri(Symbol(:exp_e, x,y), .01*social_mixing_rate[x][y]/(pop[x]+pop[y]), Symbol(:S,x), pop[x], Symbol(:E,y),1000, Symbol(:E,x),1000),\n    :exposure_a=>exposure_petri(Symbol(:exp_a, x,y), 5*social_mixing_rate[x][y]/(pop[x]+pop[y]), Symbol(:S,x), pop[x], Symbol(:A,y),1000, Symbol(:E,x),1000),\n    :exposure_i2=>exposure_petri(Symbol(:exp_i2, x,y), 6*social_mixing_rate[x][y]/(pop[x]+pop[y]), Symbol(:S,x), pop[x], Symbol(:I2,y), 1000, Symbol(:E,x),1000),\n    :exposure′=>exposure_petri(Symbol(:exp_, y,x), 1*social_mixing_rate[y][x]/(pop[x]+pop[y]), Symbol(:S,y), pop[y], Symbol(:I,x), 1000, Symbol(:E,y), 1000),\n    :exposure_e′=>exposure_petri(Symbol(:exp_e, y,x), .01*social_mixing_rate[y][x]/(pop[x]+pop[y]), Symbol(:S,y), pop[y], Symbol(:E,x),1000, Symbol(:E,y),1000),\n    :exposure_a′=>exposure_petri(Symbol(:exp_a, y,x), 5*social_mixing_rate[y][x]/(pop[x]+pop[y]), Symbol(:S,y), pop[y], Symbol(:A,x),1000, Symbol(:E,y),1000),\n    :exposure_i2′=>exposure_petri(Symbol(:exp_i2, y,x), 6*social_mixing_rate[y][x]/(pop[x]+pop[y]), Symbol(:S,y), pop[y], Symbol(:I2,x), 1000, Symbol(:E,y),1000)\n  ),\n  Dict(\n    :s=>ob(Symbol(:S, x), pop[x]),\n    :e=>ob(Symbol(:E, x), 1000),\n    :a=>ob(Symbol(:A, x), 1000),\n    :i=>ob(Symbol(:I, x), 1000),\n    :i2=>ob(Symbol(:I2, x), 1000),\n    :r=>ob(Symbol(:R, x), 0),\n    :r2=>ob(Symbol(:R2, x), 0),\n    :d=>ob(Symbol(:D, x), 0),\n    :s′=>ob(Symbol(:S, y), pop[y]),\n    :e′=>ob(Symbol(:E, y), 1000),\n    :a′=>ob(Symbol(:A, y), 1000),\n    :i′=>ob(Symbol(:I, y), 1000),\n    :i2′=>ob(Symbol(:I2, y), 1000),\n    :r′=>ob(Symbol(:R, y), 0),\n    :r2′=>ob(Symbol(:R2, y), 0),\n    :d′=>ob(Symbol(:D, y), 0)\n  ));\nnothing #hide","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"Use this new presentation to define a model of cross exposure between two populations","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"crossexposure = @relation (s, e, i, i2, a, r, r2, d, s′, e′, i′, i2′, a′, r′, r2′, d′) begin\n    exposure(s, i′, e)\n    exposure_i2(s, i2′, e)\n    exposure_a(s, a′, e)\n    exposure_e(s, e′, e)\n    exposure′(s′, i, e′)\n    exposure_i2′(s′, i2, e′)\n    exposure_a′(s′, a, e′)\n    exposure_e′(s′, e, e′)\nend;\ndisplay_uwd(crossexposure)","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"To combine these two models, we need to create a final relational model and use the bundle_legs function in our oapply that enables us to model 3 population wires instead of each individual state as a wire. Each of these populations has their own COEXIST model, and interact through cross exposure","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"bundled_cross(x,y) = bundle_legs(F_cx(crossexposure, x, y), [tuple([1:8;]...), tuple([9:16;]...)])\nbundled_coex(x) = bundle_legs(F(coexist, x), [tuple([1:8;]...)])\nF_tcx(ex) = oapply(ex, Dict(\n    :crossexp12=>bundled_cross(3,4),\n    :crossexp13=>bundled_cross(3,5),\n    :crossexp23=>bundled_cross(4,5),\n    :coex1=>bundled_coex(3),\n    :coex2=>bundled_coex(4),\n    :coex3=>bundled_coex(5)));\n\nthreeNCoexist = @relation (pop1, pop2, pop3) begin\n    crossexp12(pop1, pop2)\n    crossexp13(pop1, pop3)\n    crossexp23(pop2, pop3)\n    coex1(pop1)\n    coex2(pop2)\n    coex3(pop3)\nend;\ndisplay_uwd(threeNCoexist)\n\nthreeNCoexist_algpetri = apex(F_tcx(threeNCoexist))\nGraph(threeNCoexist_algpetri)","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"We can JSON to convert this Petri net into an easily shareable format","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"JSON.print(threeNCoexist_algpetri.tables)","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"We can now easily generate a solver for DifferentialEquations.jl because we encoded the intitial parameters and rates throughout the construction of the model, the final result knows its concentrations and rates.","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"tspan = (0.0,100.0);\nprob = ODEProblem(vectorfield(threeNCoexist_algpetri),concentrations(threeNCoexist_algpetri),tspan,rates(threeNCoexist_algpetri));\nsol = solve(prob,Tsit5());\nplot(sol, xlabel=\"Time\", ylabel=\"Number of people\")","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"If we want to model other intervention methods, we can simply adjust the rates of exposure to represent stay at home orders and mask wearing. Because of how we have defined our rates, we can simply update the social mixing rates, and resolve the model.","category":"page"},{"location":"examples/covid/coexist/coexist/","page":"COEXIST Multi-Generational COVID Model","title":"COEXIST Multi-Generational COVID Model","text":"for i in 1:length(social_mixing_rate)\n  for j in 1:length(social_mixing_rate[1])\n    social_mixing_rate[i][j] = social_mixing_rate[i][j] / (i != j ? 10 : 5);\n  end\nend\nthreeNCoexist_algpetri = apex(F_tcx(threeNCoexist));\n\nprob = ODEProblem(vectorfield(threeNCoexist_algpetri),concentrations(threeNCoexist_algpetri),tspan,rates(threeNCoexist_algpetri));\nsol = solve(prob,Tsit5());\nplot(sol, xlabel=\"Time\", ylabel=\"Number of people\")","category":"page"}]
}
