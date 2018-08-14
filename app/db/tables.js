import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm/browser'

@Entity()
export class Organisation {
    /** @type {number} */
    @PrimaryGeneratedColumn()
    id = undefined

    /** @type {string} */
    @Column('varchar')
    name = undefined

    /** @type {string} */
    @Column('varchar')
    colour = undefined

    /** @type {string} */
    @Column('varchar')
    telephone = undefined

    /** @type {Hours[]} */
    @OneToMany(() => Hours, hours => hours.organisation)
    hours = undefined
}

@Entity()
export class Hours {
    @PrimaryGeneratedColumn()
    id = undefined

    @Column('varchar')
    workDescription = ''

    @Column('datetime')
    startTime = undefined

    @Column('datetime')
    endTime = undefined

    @Column('double')
    rate = undefined

    @Column('boolean')
    isPaid = false

    @ManyToOne(() => Organisation, organisation => organisation.hours)
    organisation = undefined
}
