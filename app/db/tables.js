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
    /** @type {number} */
    @PrimaryGeneratedColumn()
    id = undefined

    /** @type {string} */
    @Column('varchar')
    workDescription = ''

    /** @type {Date} */
    @Column('datetime')
    startTime = undefined

    /** @type {Date} */
    @Column('datetime')
    endTime = undefined

    /** @type {number} */
    @Column('double')
    hourlyRate = undefined

    /** @type {number} */
    @Column('double')
    hoursUnpaid = undefined

    /** @type {boolean} */
    @Column('boolean')
    isPaid = false

    /** @type {Organisation} */
    @ManyToOne(() => Organisation, organisation => organisation.hours)
    organisation = undefined
}
