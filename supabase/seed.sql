-- Add test user admin@admin - adminadmin
INSERT INTO
    auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) (
        select
            '00000000-0000-0000-0000-000000000000',
            '00000000-0000-0000-0000-000000000000',
            'authenticated',
            'authenticated',
            'admin@admin.com',
            crypt ('adminadmin', gen_salt ('bf')),
            current_timestamp,
            current_timestamp,
            current_timestamp,
            '{"provider":"email","providers":["email"]}',
            '{"username":"admin", "is_private": true}',
            current_timestamp,
            current_timestamp,
            '',
            '',
            '',
            ''
        FROM
            generate_series(1, 1)
    );

-- test user email identity
INSERT INTO
    auth.identities (
        id,
        provider_id,
        user_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at
    ) (
        select
            uuid_generate_v4 (),
            uuid_generate_v4 (),
            id,
            format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb,
            'email',
            current_timestamp,
            current_timestamp,
            current_timestamp
        from
            auth.users
    );

    INSERT INTO "public"."books" ("id", "created_at", "title", "description", "author", "image_url", "number_pages", "type", "status", "categories", "user_id", "score", "end_date") VALUES ('2', '2024-06-11 16:55:02.634988+00', 'Misery', 'Misery Chastain ha muerto. Paul Sheldon la ha matado. Con alivio y hasta con alegría. Misery lo ha hecho rico. Porque Misery es la heroína que ha protagonizado sus exitosos libros.

Paul quiere volver a escribir. Algo diferente, algo auténtico. Pero entonces sufre un accidente y despierta inmóvil y atravesado por el dolor en una cama que no es la suya, tampoco la de un hospital.

Annie Wilkes lo ha recogido y lo ha traído a su remota casa de la montaña. La buena noticia es que Annie había sido enfermera y tiene medicamentos analgésicos. La mala es que ha sido durante mucho tiempo la fan número uno de Paul. Y cuando descubre lo que le ha hecho a Misery Chastain, no le gusta. No le gusta en absoluto.

Antes, Paul Sheldon escribía para ganarse la vida.

Ahora, Paul Sheldon escribe para sobrevivir.', 'Stephen King', 'https://i.imgur.com/YOAzM2c.jpeg', '400', 'paper', 'finished', '{terror}', '00000000-0000-0000-0000-000000000000', '7', null), ('3', '2024-06-11 16:57:50.666021+00', 'El Exorcista', 'Basada en un hecho real, ocurrido en la década de los cuarenta del siglo pasado, la protagonista es una niña de apenas once años que sufre terribles transformaciones, sobre todo en su comportamiento. Ni médicos ni científicos ni psicólogos son capaces de hallar la causa de tal estado y paulatinamente todo se va decantando hacia la hipótesis de que la niña está poseída por el demonio.', 'William Peter Blatty', 'https://i.imgur.com/Z7fedx5.jpeg', '416', 'paper', 'finished', '{terror}', '00000000-0000-0000-0000-000000000000', '10', null), ('4', '2024-06-12 15:52:25.457674+00', 'Marina', 'En la Barcelona de 1980 Óscar Drai sueña despierto, deslumbrado por los palacetes modernistas cercanos al internado en el que estudia. En una de sus escapadas conoce a Marina, que comparte con Óscar la aventura de adentrarse en un enigma doloroso del pasado de la ciudad. Un misterioso personaje de la posguerra se propuso el mayor desafío imaginable, pero su ambición lo arrastró por sendas siniestras cuyas consecuencias debe pagar alguien todavía hoy.', 'Carlos Ruiz Zafón', 'https://i.imgur.com/4yTXNcq.jpeg', '304', 'paper', 'finished', '{fiction}', '00000000-0000-0000-0000-000000000000', '10', null), ('5', '2024-06-23 19:11:10.904721+00', 'El niño con el pijama de rayas', 'Estimado lector, estimada lectora:

Aunque el uso habitual de un texto como éste es describir las características de la obra, por una vez nos tomaremos la libertad de hacer una excepción a la norma establecida. No sólo porque el libro que tienes en tus manos es muy difícil de definir, sino porque estamos convencidos de que explicar su contenido estropearía la experiencia de la lectura. Creemos que es importante empezar esta novela sin saber de qué trata.

No obstante, si decides embarcarte en la aventura, debes saber que acompañarás a Bruno, un niño de nueve años, cuando se muda con su familia a una casa junto a una cerca. Cercas como ésa existen en muchos sitios del mundo, sólo deseamos que no te encuentres nunca con una. Por último, cabe aclarar que este libro no es sólo para adultos; también lo pueden leer, y sería recomendable que lo hicieran, niños a partir de los trece años de edad.', 'John Boyne', 'https://m.media-amazon.com/images/I/91OyzQ4MrJL._AC_UF1000,1000_QL80_.jpg', '224', 'paper', 'finished', '{history,drama}', '00000000-0000-0000-0000-000000000000', '10', '2025-05-28'), ('6', '2024-06-23 19:17:02.64333+00', 'La sombra del viento', 'Un amanecer de 1945, un muchacho es conducido por su padre a un misterioso lugar oculto en el corazón de la ciudad vieja: el Cementerio de los Libros Olvidados. Allí, Daniel Sempere encuentra un libro maldito que cambia el rumbo de su vida y le arrastra a un laberinto de intrigas y secretos enterrados en el alma oscura de la ciudad. La Sombra del Viento es un misterio literario ambientado en la Barcelona de la primera mitad del siglo xx, desde los últimos esplendores del Modernismo hasta las tinieblas de la posguerra.

Aunando las técnicas del relato de intriga y suspense, la novela histórica y la comedia de costumbres, La Sombra del Viento es sobre todo una trágica historia de amor cuyo eco se proyecta a través del tiempo. Con gran fuerza narrativa, el autor entrelaza tramas y enigmas a modo de muñecas rusas en un inolvidable relato sobre los secretos del corazón y el embrujo de los libros cuya intriga se mantiene hasta la última página.', 'Carlos Ruiz Zafón', 'https://m.media-amazon.com/images/I/61zOWUcvMbL._AC_UF894,1000_QL80_.jpg', '592', 'paper', 'finished', '{fiction,thriller}', '00000000-0000-0000-0000-000000000000', '10', null), ('7', '2024-06-28 12:44:45.650171+00', 'El visitante', 'Un niño de once años ha sido brutalmente asesinado. Todas las pruebas apuntan a uno de los ciudadanos más queridos de Flint City: Terry Maitland, entrenador en la liga infantil, profesor de literatura, marido ejemplar y padre de dos niñas. El detective Ralph Anderson ordena su detención. Maitland tiene una coartada firme que demuestra que estuvo en otra ciudad cuando se cometió el crimen, pero las pruebas de ADNencontradas en el lugar de los hechos confirman que es culpable. Ante la justicia y la opinión pública Terry Maitland es un asesino y el caso está resuelto.

Pero el detective Anderson no está satisfecho. Maitland parece un buen tipo, un ciudadano ejemplar, ¿acaso tiene dos caras? Y ¿cómo es posible que estuviera en dos sitios a la vez?

La respuesta, como no podría ser de otra forma saliendo de la pluma de Stephen King, te hará desear no haber preguntado.', 'Stephen King', 'https://m.media-amazon.com/images/I/81lSGYdT81L._AC_UF894,1000_QL80_.jpg', '592', 'paper', 'reading', '{mystery,crime_novel}', '00000000-0000-0000-0000-000000000000', '8', null), ('8', '2024-07-05 19:13:18.375779+00', 'El retrato de Rose Madder', 'Tras años de maltratos, por fin Rosie Daniels había abandonado a su marido y emprendido una nueva vida en otra ciudad.

Pero es muy difícil no dejar pistas, y Norman, el brutal policía con quien se había casado, inicia la caza sistemática e implacable de su mujer. Cada vez está más y más cerca, y Rosie advierte, no sin temor, que su única aliada es esa figura pintada en el cuadro, que la invita a pasar a su lado de la realidad.', 'Stephen King', 'https://m.media-amazon.com/images/I/81Y6DWOdLEL._AC_UF894,1000_QL80_.jpg', '496', 'kindle', 'finished', '{fiction,psychological_thriller,mystery,history}', '00000000-0000-0000-0000-000000000000', '7', null), ('9', '2024-07-08 18:10:00.082349+00', 'Asesinato en el Orient Express', 'En un lugar aislado de la antigua Yugoslavia, en plena madrugada, una fuerte tormenta de nieve obstaculiza la línea férrea por donde circula el Orient Express. Procedente de la exótica Estambul, en él viaja el detective Hércules Poirot, que repentinamente se topa con uno de los casos más desconcertantes de su carrera: en el compartimiento vecino ha sido asesinado Samuel E. Ratchett mientras dormía, pese a que ningún indicio trasluce un móvil concreto. Poirot aprovechará la situación para indagar entre los ocupantes del vagón, que a todas luces deberían ser los únicos posibles autores del crimen.

Una víctima, doce sospechosos y una mente privilegiada en busca de la verdad.', 'Agatha Christie', 'https://proassetspdlcom.cdnstatics2.com/usuaris/libros/fotos/201/original/portada_asesinato-en-el-orient-express_agatha-christie_201505291004.jpg', '248', 'paper', 'finished', '{crime_novel}', '00000000-0000-0000-0000-000000000000', '7', null), ('10', '2024-07-08 18:14:42.08034+00', 'Diez negritos', 'Diez personas sin relación alguna entre sí son reunidas en un misterioso islote de la costa inglesa por un tal Sr. Owen, propietario de una lujosa mansión a la par que perfecto desconocido para todos sus invitados. Tras la primera cena, y sin haber conocido aún a su anfitrión, los diez comensales son acusados mediante una grabación de haber cometido un crimen en el pasado.

Uno por uno, a partir de ese momento, son asesinados sin explicación ni motivo aparente. Sólo una vieja canción infantil parece encerrar el misterio de una creciente pesadilla.', 'Agatha Christie', 'https://i.imgur.com/n53wYfS.png', '232', 'paper', 'finished', '{crime_novel}', '00000000-0000-0000-0000-000000000000', '10', null), ('11', '2024-07-08 18:16:46.245196+00', 'Muerte en el Nilo', 'Durante unas placenteras vacaciones en Egipto, el detective Hércules Poirot coincide con Linnet y Simon, unos conocidos suyos que están de luna de miel en el país de los faraones.

El encanto de tan maravillosos días se rompe cuando una mañana, en el transcurso de un crucero por el Nilo, la bella Linnet aparece muerta de un disparo en la cabeza.

¿Será capaz Poirot de encontrar al asesino de la joven esposa? ¿Será capaz de discernir entre imaginación y realidad, aun estando a bordo la ex pareja de Simon, empeñada desde el mismo día de la boda en arruinar su matrimonio con la desafortunada Linnet?

El misterio está servido.', 'Agatha Christie', 'https://m.media-amazon.com/images/I/91Bo76DfuxL._AC_UF1000,1000_QL80_.jpg', '352', 'paper', 'finished', '{crime_novel}', '00000000-0000-0000-0000-000000000000', '7', null), ('12', '2024-07-08 18:20:02.708483+00', 'La casa torcida', 'Tres generaciones de la familia del multimillonario griego Aristide Leonides conviven en Inglaterra bajo el mismo techo: una curiosa mansión de estructura inclinada. Una multitud de personajes se entremezcla en los pasillos y las estancias de la casa, incluidas la joven y hermosa Brenda, segunda esposa del anciano patriarca, y Sophia, su más avispada nieta, cuyo futuro suegro es comisario de policía. Sin embargo, la paz hogareña se trunca cuando Aristide es envenenado. Las sospechas recaen sobre todos los miembros de la familia.', 'Agatha Christie', 'https://m.media-amazon.com/images/I/81erW-zcXYL._AC_UF894,1000_QL80_.jpg', '240', 'paper', 'finished', '{crime_novel}', '00000000-0000-0000-0000-000000000000', '8', null), ('13', '2024-08-07 18:30:59.629959+00', 'Reina Roja', 'Antonia Scott es especial. Muy especial.

No es policía ni criminalista. Nunca ha empuñado un arma ni llevado una placa, y, sin embargo, ha resuelto decenas de crímenes.

Pero hace un tiempo que Antonia no sale de su ático de Lavapiés. Las cosas que ha perdido le importan mucho más que las que esperan ahí fuera.

Tampoco recibe visitas. Por eso no le gusta nada, nada, cuando escucha unos pasos desconocidos subiendo las escaleras hasta el último piso.

Sea quien sea, Antonia está segura de que viene a buscarla.

Y eso le gusta aún menos.', 'Juan Gómez-Jurado', 'https://m.media-amazon.com/images/I/71GC9IBeQjL._AC_UF894,1000_QL80_FMwebp_.jpg', '568', 'paper', 'finished', '{crime_novel}', '00000000-0000-0000-0000-000000000000', '8', null), ('14', '2024-08-07 18:34:29.571882+00', 'Drácula', 'Antes de ser elevada por el cine y por innumerables series de novelas a uno de los puestos privilegiados del imaginario actual, la leyenda del vampiro alcanzó un gran reconocimiento en este clásico de la literatura de terror. En ella se sintetizan magistralmente las pulsiones más profundas del ser humano: la vida y la muerte, la sexualidad y el bien y el mal.', 'Bram Stoker', 'https://m.media-amazon.com/images/I/71xcDXkr1OL._AC_UF894,1000_QL80_.jpg', '576', 'paper', 'finished', '{mystery,terror}', '00000000-0000-0000-0000-000000000000', '10', '2025-05-28'), ('15', '2024-08-07 18:40:38.33796+00', 'La mitad oscura', 'Cuando Thad Beaumont en pleno bloqueo creativo, después de que su novela Las súbitas bailarinas optara al Premio Nacional de Literatura y lo perdiera, decidió seguir los consejos de su mujer y publicar una serie de thrillers retorcidos y sangrientos bajo el pseudónimo de George Stark, no pensó, ni por asomo, que le sería tan difícil «deshacerse» de ese otro yo que, no se explicaba cómo, había dejado de ser ficticio.

Cuando el comisario Alan Pangborn aparece en su casa acusándole de un brutal asesinato, Thad trata de afirmar su inocencia, de asegurar que nada tiene que ver con todos esos monstruosos asesinatos cometidos tan cerca de su casa, ni con la retorcida mente que protagoniza sus novelas policíacas, ni con las llamadas de aquella voz que, obscena y susurrante, le pide al teléfono que se rinda. Pero, ¿cómo explicar que sus huellas ensangrentadas han aparecido por todas partes en la escena del crimen?', 'Stephen King', 'https://cdn.vivlio.com/product/v1/62a7d600-3c03-4514-9d7e-ff4f5f701496/front-cover?tag=AQA5AnEooFXXds6N3yVOidAyVDRFK0NwM08%3D&size=450x675', '568', 'paper', 'finished', '{terror,mystery}', '00000000-0000-0000-0000-000000000000', '7', null), ('16', '2024-08-18 13:52:25.186876+00', 'La Tienda', 'En el pueblo de Castle Rock, en el estado de Maine, acaba de abrir sus puertas una tienda nueva: Cosas Necesarias. En ella venden ese objeto que llevas buscando tanto tiempo, o que quizá no hayas buscado jamás, aunque con solo verlo sabrás que lo necesitas sin falta. Simplemente debes pagar un precio pactado, casi irrisorio, y añadirle algo más: un trato, un favor, una travesura inocente en apariencia, para que sea tuyo para siempre.

Leland Gaunt, el extraño propietario de la tienda, sabe cuánto estás dispuesto a pagar... y puede que en el precio vaya incluido un asesinato.', 'Stephen King', 'https://m.media-amazon.com/images/I/81oNYlOWokL._AC_UF894,1000_QL80_.jpg', '960', 'paper', 'finished', '{mystery,terror}', '00000000-0000-0000-0000-000000000000', '7', null), ('17', '2024-09-14 21:13:12.298291+00', 'Harry Potter y la piedra filosofal', 'Harry Potter nunca ha oído hablar de Hogwarts hasta que empiezan a caer cartas en el felpudo del número 4 de Privet Drive. Llevan la dirección escrita con tinta verde en un sobre de pergamino amarillento con un sello de lacre púrpura, y sus horripilantes tíos se apresuran a confiscarlas. Más tarde, el día que Harry cumple once años, Rubeus Hagrid, un hombre gigantesco cuyos ojos brillan como escarabajos negros, irrumpe con una noticia extraordinaria: Harry Potter es un mago, y le han concedido una plaza en el Colegio Hogwarts de Magia y Hechicería. ¡Está a punto de comenzar una aventura increíble!', 'J. K. Rowling', 'https://m.media-amazon.com/images/I/51uxZ1EkT4L.jpg', '264', 'kindle', 'finished', '{fantasy}', '00000000-0000-0000-0000-000000000000', '8', null), ('18', '2024-09-14 21:15:49.657106+00', 'Harry Potter y la cámara secreta', 'El verano de Harry Potter ha incluido el peor cumpleaños de su vida, las funestas advertencias de un elfo doméstico llamado Dobby y el rescate de casa de los Dursley protagonizado por su amigo Ron Weasley al volante de un coche mágico volador. De vuelta en el Colegio Hogwarts de Magia y Hechicería, donde va a empezar su segundo curso, Harry oye unos extraños susurros que resuenan por los pasillos vacíos. Y entonces empiezan los ataques y varios alumnos aparecen petrificados... Por lo visto, las siniestras predicciones de Dobby se están cumpliendo...', 'J. K. Rowling', 'https://m.media-amazon.com/images/I/91Fo5YdHNLL._AC_UF894,1000_QL80_.jpg', '288', 'kindle', 'finished', '{fantasy}', '00000000-0000-0000-0000-000000000000', '8', null), ('19', '2024-09-14 21:18:03.080601+00', 'Harry Potter y el prisionero de Azkaban', 'Cuando el autobús noctámbulo irrumpe en una calle oscura y frena con fuertes chirridos delante de Harry, comienza para él un nuevo curso en Hogwarts, lleno de acontecimientos extraordinarios. Sirius Black, asesino y seguidor de lord Voldemort, se ha fugado, y dicen que va en busca de Harry. En su primera clase de Adivinación, la profesora Trelawney ve un augurio de muerte en las hojas de té de la taza de Harry... Pero quizá lo más aterrador sean los dementores que patrullan por los jardines del colegio, capaces de sorberte el alma con su beso...', 'J. K. Rowling', 'https://m.media-amazon.com/images/I/81vd2d65h+L._AC_UF894,1000_QL80_.jpg', '360', 'kindle', 'finished', '{fantasy}', '00000000-0000-0000-0000-000000000000', '8', null), ('20', '2024-09-14 21:20:24.996288+00', 'Harry Potter y el cáliz de fuego', 'Se va a celebrar en Hogwarts el Torneo de los Tres Magos. Sólo los alumnos mayores de diecisiete años pueden participar en esta competición, pero, aun así, Harry sueña con ganarla. En Halloween, cuando el cáliz de fuego elige a los campeones, Harry se lleva una sorpresa al ver que su nombre es uno de los escogidos por el cáliz mágico. Durante el torneo deberá enfrentarse a desafíos mortales, dragones y magos tenebrosos, pero con la ayuda de Ron y Hermione, sus mejores amigos, ¡quizá logre salir con vida!', 'J. K. Rowling', 'https://m.media-amazon.com/images/I/61Ao7RvSopL._AC_UF894,1000_QL80_.jpg', '672', 'kindle', 'finished', '{fantasy}', '00000000-0000-0000-0000-000000000000', '10', null), ('21', '2024-09-14 21:23:15.067136+00', 'Harry Potter y la Orden del Fénix', 'Son malos tiempos para Hogwarts. Tras el ataque de los dementores a su primo Dudley, Harry Potter comprende que Voldemort no se detendrá ante nada para encontrarlo. Muchos niegan que el Señor Tenebroso haya regresado, pero Harry no está solo: una orden secreta se reúne en Grimmauld Place para luchar contra las fuerzas oscuras. Harry debe permitir que el profesor Snape le enseñe a protegerse de las brutales incursiones de Voldemort en su mente. Pero éstas son cada vez más potentes, y a Harry se le está agotando el tiempo...', 'J. K. Rowling', 'https://m.media-amazon.com/images/I/81g9SrF8P1L._AC_UF894,1000_QL80_.jpg', '896', 'kindle', 'finished', '{fantasy}', '00000000-0000-0000-0000-000000000000', '10', null), ('22', '2024-09-14 21:25:17.383091+00', 'Harry Potter y el misterio del príncipe', 'Con dieciséis años cumplidos, Harry inicia el sexto curso en Hogwarts en medio de terribles acontecimientos que asolan Inglaterra. Elegido capitán del equipo de quidditch, los ensayos, los exámenes y las chicas ocupan todo su tiempo, pero la tranquilidad dura poco.

A pesar de los férreos controles de seguridad que protegen la escuela, dos alumnos son brutalmente atacados. Dumbledore sabe que se acerca el momento, anunciado por la Profecía, en que Harry y Voldemort se enfrentarán a muerte: «El único con poder para vencer al Señor Tenebroso se acerca... Uno de los dos debe morir a manos del otro, pues ninguno de los dos podrá vivir mientras siga el otro con vida.»

El anciano director solicitará la ayuda de Harry y juntos emprenderán peligrosos viajes para intentar debilitar al enemigo, para lo cual el joven mago contará con un viejo libro de pociones perteneciente a un misterioso personaje, alguien que se hace llamar Príncipe Mestizo.', 'J. K. Rowling', 'https://m.media-amazon.com/images/I/914184LGCuL._AC_UF1000,1000_QL80_.jpg', '608', 'kindle', 'finished', '{fantasy}', '00000000-0000-0000-0000-000000000000', '10', null), ('29', '2025-05-11 13:48:02.076949+00', 'Reina roja', 'No has conocido a nadie como ella... El fenómeno que ha enganchado a más de 1.200.000 lectores. Antonia Scott es especial. Muy especial. No es policía ni criminalista. Nunca ha empuñado un arma ni llevado una placa, y, sin embargo, ha resuelto decenas de crímenes. Pero hace un tiempo que Antonia no sale de su ático de Lavapiés. Las cosas que ha perdido le importan mucho más que las que esperan ahí fuera. Tampoco recibe visitas. Por eso no le gusta nada, nada, cuando escucha unos pasos desconocidos subiendo las escaleras hasta el último piso. Sea quien sea, Antonia está segura de que viene a buscarla. Y eso le gusta aún menos. NO HAS LEÍDO NUNCA UN THRILLER COMO ESTE La crítica ha dicho:«Los lectores van a caer rendidos ante Antonia Scott. Este personaje es, sin duda, lo mejor que le ha ocurrido al thriller internacional en los últimos diez años.»ABC «A Juan Gómez-Jurado le leen en cuarenta países y ha vendido millones de libros. Diviértanse y lean a muerte.»El País «Juan Gómez-Jurado atrapa irremediablemente al lector.»Booklist «Respira hondo antes de empezar a leer. No volverás a tener tiempo hasta el final.»Javier Sierra «Gómez-Jurado es el mejor escritor de thriller de Europa.»Gorka Rojo, Zenda', 'Juan Gómez-Jurado', 'https://covers.openlibrary.org/b/id/9256100-L.jpg', '0', 'paper', 'finished', '{}', '00000000-0000-0000-0000-000000000000', '0', '2025-05-14'), ('30', '2025-05-14 17:24:18.83689+00', 'El Señor De Los Anillos', 'Los Anillos de Poder fueron forjados en antiguos tiempos por los herreros Elfos, y Sauron, el Señor Oscuro, forjó el Anillo Único. Pero en una ocasión se lo quitaron, y aunque lo buscó por toda la Tierra Media nunca pudo encontrarlo. Al cabo de muchos años fue a caer casualmente en manos del hobbit Bilbo Bolsón.Desde la Torre Oscura de Mordor, el poder de Sauron se extendió alrededor. Llegó a reunir todos los Grandes Anillos, pero continuaba buscando el Anillo Único, que completaría el dominio de Mordor.', 'Gary Russell', 'https://covers.openlibrary.org/b/id/5267390-L.jpg', '1400', 'paper', 'finished', '{fantasy}', '00000000-0000-0000-0000-000000000000', '10', null);