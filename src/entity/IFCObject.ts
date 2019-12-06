import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class IFCObject {
    @PrimaryColumn()
    oid: number;
    @Column()
    ifcId: string;
    @Column()
    name: string;
    @Column()
    SectionNature: string;
    @Column()
    sectionAnnexePiece: string;
    @Column()
    sectionAppartement: string;
    @Column()
    sectionBatiment: string;
    @Column()
    sectionEtage: string;
    @Column()
    sectionPiece: string;
    @Column({
        length: 500
    })
    properties: object;
    constructor(){
        this.oid = 0;
        this.ifcId = "err";
        this.name = "err";
        this.SectionNature = "err";
        this.sectionAnnexePiece = "err";
        this.sectionAppartement = "err";
        this.sectionBatiment = "err";
        this.sectionEtage = "err";
        this.sectionPiece = "err";
        this.properties = {};
    }
}
